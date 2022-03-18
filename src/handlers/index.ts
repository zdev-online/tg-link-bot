import { Telegraf } from "telegraf";
import { BotContext } from "../interfaces";
import { logger } from "../utils";
import { add_channel_handler } from "./add-channel.handler";
import { change_handler } from "./change.handler";
import { channel_stats_handler } from "./channel-stats.handler";
import { get_refs_stats_handler } from "./get-refs-stats.handler";
import { my_ref_handler } from "./my-ref.handler";
import { start_handler } from "./start.handler";
import { user_stats_handler } from "./user-stats.handler";

export default (bot: Telegraf<BotContext>) => {
  start_handler(bot);
  add_channel_handler(bot);
  channel_stats_handler(bot);
  my_ref_handler(bot);
  change_handler(bot);
  get_refs_stats_handler(bot);
  user_stats_handler(bot);
  return logger.log(`[Handlers] - connected`);
} 