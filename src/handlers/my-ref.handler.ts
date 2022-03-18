import { Telegraf } from "telegraf";
import { BotContext } from "../interfaces";
import { GET_REF_LINK } from "../keyboard.buttons";
import { ReferalsModel, UsersModel } from "../models";
import { get_refs, is_admin, logger } from "../utils";

export const my_ref_handler = (bot: Telegraf<BotContext>) => {
  bot.hears(GET_REF_LINK, async ctx => {
    const user = await UsersModel.findOne({
      where: {
        tg_id: ctx.from.id
      }
    });
    if (!user || !user.can_create_link) { 
      return logger.debug(`[MyRef Handler] - user not found`); 
    }

    if (user.referal_code) {
      
      let message = `<b>Ваша ссылка:</b> https://t.me/${ctx.me}?start=${user.referal_code}\n`;
      let all_day = 0;

      const refs = await get_refs(user.id);
      
      if (!refs.length) {
        logger.debug(`[MyRef Handler] - has_ref_link + no_ref`.cyan); 
        message += `\nВы пока что никого не пригласили!`;
        return await ctx.replyWithHTML(message);
      }
      
      
      message += `Статистика:\n`;

      refs.forEach(x => {
        all_day += x.users.length;
        message += `За ${x.day} - приглашено ${x.users.length}\n`;
      });

      message += `\nЗа всё время: ${all_day}`;
      logger.debug(`[MyRef Handler] - has_ref_link`.cyan); 

      return await ctx.replyWithHTML(message);
    } else {
      const new_code = Math.random().toString(36).slice(2, 14);
      const link = `https://t.me/${ctx.me}?start=${new_code}`;
      user.referal_code = new_code;
      await user.save();
      logger.debug(`[MyRef Handler] - new_ref_link`.cyan); 

      return await ctx.replyWithHTML(`<b>Реферальная ссылка создана:</b> ${link}`);
    }
  });
  return logger.log(`[AddChannelHandler] - connected`);
}