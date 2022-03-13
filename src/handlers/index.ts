import { Telegraf } from "telegraf";
import { BotContext } from "../interfaces";
import { logger } from "../utils";
import { add_channel_handler } from "./add-channel.handler";
import { channel_stats_handler } from "./channel-stats.handler";
import { start_handler } from "./start.handler";

export default (bot: Telegraf<BotContext>) => {
  start_handler(bot);
  add_channel_handler(bot);
  channel_stats_handler(bot);

  return logger.log(`[Handlers] - connected`);
} 