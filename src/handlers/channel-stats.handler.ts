import { Telegraf } from "telegraf";
import { BotContext } from "../interfaces";
import { CHANNEL_STATS_SCENE } from "../scene.ids";
import { is_admin, logger } from "../utils";

export const channel_stats_handler = (bot: Telegraf<BotContext>) => {
  bot.start(async ctx => {
    if (!is_admin(ctx.from.id)) { return; }
    return await ctx.scene.enter(CHANNEL_STATS_SCENE);
  });
  return logger.log(`[ChannelStatsHandler] - connected`);
}