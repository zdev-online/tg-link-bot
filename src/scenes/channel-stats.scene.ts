import { Composer, Scenes } from "telegraf";
import { Op } from 'sequelize';
import { BotContext } from "../interfaces";
import { NEXT_PAGE, PREV_PAGE } from "../keyboard.buttons";
import { getChannelStatsKeyboard } from "../keyboards";
import { ChannelsModel, SubsModel } from "../models";
import { CHANNEL_STATS_SCENE } from "../scene.ids";
import { chunkArray, getFullChannelStats } from "../utils";

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
  const id: number = Number(ctx.message.text.replace('#', ''));
  const channel: ChannelsModel = ctx.scene.session.pages[ctx.scene.session.page][id];

  const subs = await SubsModel.findAll({
    where: {
      channel_id: channel.id
    }
  });

  if (!subs.length) {
    return await ctx.replyWithHTML("Статистики для этого канала пока что нет! (Ещё никто не подписался)");
  }

  return await ctx.replyWithHTML(getFullChannelStats(channel, subs));
});


const channel_stats_scene = new Scenes.WizardScene<BotContext>(CHANNEL_STATS_SCENE);

channel_stats_scene.enter(async ctx => {
  const channels = await ChannelsModel.findAll({
    where: {
      type: {
        [Op.not]: 'link'
      },
    }
  });

  if (!channels.length) {
    return await ctx.replyWithHTML("Каналов в статистике нет!\nP.S Статистика учитывается только для каналов, добавленных через @channel_username");
  }

  const pages = chunkArray(channels, 5);
  const page = 0;

  ctx.scene.session.pages = pages;
  ctx.scene.session.page = page;

  return await ctx.replyWithHTML("", getChannelStatsKeyboard(pages, page));
});

export { channel_stats_scene }