import { Composer, Scenes } from "telegraf"
import { BotContext } from "../interfaces"
import { NEXT_PAGE, PREV_PAGE } from "../keyboard.buttons";
import { getRefStatsKeyboard } from "../keyboards/get-ref-stats.keyboard";
import { UsersModel } from "../models";
import { GET_REFS_STATS_SCENE } from "../scene.ids";
import { chunkArray, getRefsStatsMessage, getRefsUserStatsMessage, get_refs } from "../utils";

const step = new Composer<BotContext>();


step.hears(NEXT_PAGE, async ctx => {
  ctx.scene.session.page++;
  let pages = ctx.scene.session.pages;
  let page = ctx.scene.session.page;

  return await ctx.replyWithHTML(getRefsStatsMessage(pages, page), getRefStatsKeyboard(pages, page));
});

step.hears(PREV_PAGE, async ctx => {
  ctx.scene.session.page--;
  let pages = ctx.scene.session.pages;
  let page = ctx.scene.session.page;

  return await ctx.replyWithHTML(getRefsStatsMessage(pages, page), getRefStatsKeyboard(pages, page));
});

step.hears(/^\#[1-5]$/i, async ctx => {
  const id: number = Number(ctx.message.text.replace('#', '')) - 1;
  const pages = ctx.scene.session.pages;
  const page = ctx.scene.session.page;

  const user = pages[page][id] as UsersModel;
  const refs = await get_refs(user.id);

  return await ctx.replyWithHTML(getRefsUserStatsMessage(user, refs));
});

const get_refs_stats_scene = new Scenes.WizardScene<BotContext>(GET_REFS_STATS_SCENE, step);

get_refs_stats_scene.enter(async ctx => {
  const users = await UsersModel.findAll({
    where: {
      can_create_link: true
    }
  });
  if (!users.length) {
    return await ctx.replyWithHTML("<b>Нет пользователей, которые могут создавать реф-ссылки!</b>");
  }

  const pages = chunkArray(users, 5);
  const page = 0;

  ctx.scene.session.pages = pages;
  ctx.scene.session.page = page;

  return await ctx.replyWithHTML(getRefsStatsMessage(pages, page), getRefStatsKeyboard(pages, page));
});

export { get_refs_stats_scene };