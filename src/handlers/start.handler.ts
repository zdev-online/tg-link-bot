import { Telegraf } from "telegraf";
import { BotContext } from "../interfaces";
import { getRefKeyboard } from "../keyboards";
import { getAdminKeyboard } from "../keyboards/admin.keyboard";
import { UsersModel } from "../models";
import { SUB_TO_CHANNELS_SCENE } from "../scene.ids";
import { create_user, is_admin, logger } from "../utils";
import { getStartAdminMessage } from "../utils/get-message.utils";

export const start_handler = (bot: Telegraf<BotContext>) => {
  bot.start(async ctx => {
    const code = ctx.message.text.split(' ')[1] || undefined;

    const user = await UsersModel.findOne({
      where: {
        tg_id: ctx.from.id
      }
    });
    logger.debug(`${ctx.from.first_name} - HAS_REF_CODE: ${!!code}`.cyan);
    if (is_admin(ctx.from.id)) {
      if(!user){
        await create_user(ctx);
      }
      return await ctx.replyWithHTML(getStartAdminMessage(), getAdminKeyboard());
    } else if(!user || !user.can_create_link){
      return await ctx.scene.enter(SUB_TO_CHANNELS_SCENE, {
        code
      });
    } else {
      return await ctx.replyWithHTML("Нажмите одну из кнопок, чтобы продолжить.", getRefKeyboard());
    }
  });
  return logger.log(`[StartHandler] - connected`);
}