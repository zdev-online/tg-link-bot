import { Telegraf } from "telegraf";
import { BotContext } from "../interfaces";
import { ADD_CHANNEL_SCENE } from "../scene.ids";
import { is_admin, logger } from "../utils";

export const add_channel_handler = (bot: Telegraf<BotContext>) => {
  bot.start(async ctx => {
    if (!is_admin(ctx.from.id)) { return; }
    return await ctx.scene.enter(ADD_CHANNEL_SCENE)
  });
  return logger.log(`[AddChannelHandler] - connected`);
}