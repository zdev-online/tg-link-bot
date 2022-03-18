import { Telegraf } from "telegraf";
import { BotContext } from "../interfaces";
import { USER_STATS } from "../keyboard.buttons";
import { GET_USERS_SCENE } from "../scene.ids";
import { is_admin, logger } from "../utils";

export const user_stats_handler = (bot: Telegraf<BotContext>) => {
  bot.hears(USER_STATS, async ctx => {
    if (!is_admin(ctx.from.id)) { return; }
    return await ctx.scene.enter(GET_USERS_SCENE);
  });
  return logger.log(`[GetRefsStats Handler] - connected`);
}