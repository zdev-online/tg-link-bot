import { Telegraf } from "telegraf";
import { BotContext } from "../interfaces";
import { CHANGE_LINK, CHANGE_TEXT } from "../keyboard.buttons";
import { CHANGE_LINK_SCENE, CHANGE_TEXT_SCENE } from "../scene.ids";

export const change_handler = (bot: Telegraf<BotContext>) => {
  bot.hears(CHANGE_LINK, async ctx => {
    return await ctx.scene.enter(CHANGE_LINK_SCENE);
  });
  bot.hears(CHANGE_TEXT, async ctx => {
    return await ctx.scene.enter(CHANGE_TEXT_SCENE);
  });
}