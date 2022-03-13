import { Telegraf } from "telegraf";
import { BotContext } from "../interfaces";
import { getAdminKeyboard } from "../keyboards/admin.keyboard";
import { SUB_TO_CHANNELS_SCENE } from "../scene.ids";
import { is_admin, logger } from "../utils";
import { getStartAdminMessage } from "../utils/get-message.utils";

export const start_handler = (bot: Telegraf<BotContext>) => {
  bot.start(async ctx => {
    if (is_admin(ctx.from.id)) {
      return await ctx.replyWithHTML(getStartAdminMessage(), getAdminKeyboard());
    } else {
      return await ctx.scene.enter(SUB_TO_CHANNELS_SCENE);
    }
  });
  return logger.log(`[StartHandler] - connected`);
}