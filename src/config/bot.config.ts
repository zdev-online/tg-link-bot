import { Telegraf } from 'telegraf';
import { BotContext } from '../interfaces';
import { token } from './config.json';

const tg: Telegraf<BotContext> = new Telegraf<BotContext>(token, {});

process.once('SIGINT', () => tg.stop('SIGINT'));
process.once('SIGTERM', () => tg.stop('SIGTERM'));

export const bot: Telegraf<BotContext> = tg;