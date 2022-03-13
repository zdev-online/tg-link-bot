import { Sequelize } from "sequelize-typescript";
import { BaseError } from 'sequelize';
import { Markup, Telegraf, TelegramError } from "telegraf";
import * as logger from "./logger.utils";
import { BotContext } from "../interfaces";

export const error_handler = (ctx: BotContext, error: Error) => {
  let from = 'unknown';
  if (error instanceof TelegramError) {
    from = Telegraf.name;
    logger.warn(`[${Telegraf.name}-ERROR]: [Ошибка из модуля 'telegraf'] -> ${error.message}\n${error.stack}`);

  } else if (error instanceof BaseError) {
    from = Sequelize.name;
    logger.error(`[${Sequelize.name}-ERROR]: [Ошибка из модуля 'sequelize'] -> ${error.message}\n${error.stack}`);
  } else {
    logger.error(`[Undefined-Error]: [Неизвестная ошибка] -> ${error.message}\n${error.stack}`);
  }

  if (ctx?.scene?.current) {
    ctx.scene.leave().catch(e => logger.error(`Не удалось отправить сообщение об ошибке: ${e.message}`));
  }
  ctx.replyWithHTML("").catch(e => logger.error(`Не удалось отправить сообщение об ошибке: ${e.message}`));
}