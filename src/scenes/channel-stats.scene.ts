import { Composer, Scenes } from "telegraf";
import { Op } from 'sequelize';
import { BotContext } from "../interfaces";
import { BACK, DELETE, NEXT_PAGE, PREV_PAGE } from "../keyboard.buttons";
import { getChannelKeyboard, getChannelStatsKeyboard } from "../keyboards";
import { ChannelsModel, SubsModel } from "../models";
import { CHANNEL_STATS_SCENE } from "../scene.ids";
import { chunkArray, getAdminChannelsList, getFullChannelStats } from "../utils";

const select_step = new Composer<BotContext>();

select_step.hears(NEXT_PAGE, async ctx => {
  ctx.scene.session.page++;
  return await ctx.replyWithHTML("", getChannelStatsKeyboard(ctx.scene.session.pages, ctx.scene.session.page));
});

select_step.hears(PREV_PAGE, async ctx => {
  ctx.scene.session.page--;
  return await ctx.replyWithHTML("", getChannelStatsKeyboard(ctx.scene.session.pages, ctx.scene.session.page));
});

select_step.hears(/^\#[1-5]$/i, async ctx => {
  const id: number = Number(ctx.message.text.replace('#', '')) - 1;
  const channel: ChannelsModel = ctx.scene.session.pages[ctx.scene.session.page][id];

  ctx.scene.session.channel = channel;

  if (channel.type == 'link') {
    return await ctx.replyWithHTML("Статистика для этого канала - недоступна! (Тип: HTTP-Ссылка)", getChannelKeyboard());
  }

  const subs = await SubsModel.findAll({
    where: {
      channel_id: channel.id
    }
  });

  if (!subs.length) {
    return await ctx.replyWithHTML("Статистики для этого канала пока что нет! (Ещё никто не подписался)");
  }

  return await ctx.replyWithHTML(getFullChannelStats(channel, subs), {
    disable_web_page_preview: true
  });
});

select_step.hears(DELETE, async ctx => {
  if (!ctx.scene.session?.channel) {
    return await ctx.replyWithHTML("<b>Канал не найден!</b>");
  }

  const channel: ChannelsModel = ctx.scene.session.channel;

  await channel.destroy();

  await ctx.replyWithHTML(`Канал <a href="${channel.type == 'link' ? channel.link : `https://t.me/${channel.link}`}">${channel.name}</a> - удален из обязательной подписки!`);

  return await ctx.scene.reenter();
});

select_step.hears(BACK, async ctx => {
  let pages = ctx.scene.session.pages;
  let page = ctx.scene.session.page;

  return await ctx.replyWithHTML(getAdminChannelsList(pages, page), {
    ...getChannelStatsKeyboard(pages, page),
    disable_web_page_preview: true
  });
});

const channel_stats_scene = new Scenes.WizardScene<BotContext>(CHANNEL_STATS_SCENE, select_step);

channel_stats_scene.enter(async ctx => {
  const channels = await ChannelsModel.findAll();

  if (!channels.length) {
    return await ctx.replyWithHTML("Каналов в статистике нет!");
  }

  const pages = chunkArray(channels, 5);
  const page = 0;

  ctx.scene.session.pages = pages;
  ctx.scene.session.page = page;

  return await ctx.replyWithHTML(getAdminChannelsList(pages, page), {
    ...getChannelStatsKeyboard(pages, page),
    disable_web_page_preview: true
  });
});

export { channel_stats_scene }