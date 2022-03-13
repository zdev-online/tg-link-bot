import { Telegraf } from "telegraf";
import { BotContext } from "../interfaces";
import { logger } from "../utils";
import { start_handler } from "./start.handler";

export default (bot: Telegraf<BotContext>) => {
  start_handler(bot);

  return logger.log(`[Handlers] - connected`);
} 