import { Telegraf } from "telegraf";
import { BotContext } from "../interfaces";
import { GET_REF_STATS, GET_STATS } from "../keyboard.buttons";
import { GET_REFS_STATS_SCENE } from "../scene.ids";
import { is_admin, logger } from "../utils";

export const get_refs_stats_handler = (bot: Telegraf<BotContext>) => {
  bot.hears(GET_REF_STATS, async ctx => {
    if (!is_admin(ctx.from.id)) { return; }
    return await ctx.scene.enter(GET_REFS_STATS_SCENE);
  });
  return logger.log(`[GetRefsStats Handler] - connected`);
}