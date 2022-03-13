import { Composer, Markup, Scenes } from "telegraf";
import { BotContext } from "../interfaces";
import { CONTROL_PANEL } from "../keyboard.buttons";
import { getAdminKeyboard } from "../keyboards";
import { CHANGE_LINK_SCENE } from "../scene.ids";
import { getLinkedTextFromFile, saveDataToFile } from "../utils";

const get_link = new Composer<BotContext>();

get_link.on('text', async ctx => {
  saveDataToFile(undefined, ctx.message.text);
  await ctx.scene.leave();
  return await ctx.replyWithHTML(`Новая ссылка на канал выглядит так: ${getLinkedTextFromFile()}`, getAdminKeyboard());
});

const change_link_scene = new Scenes.WizardScene<BotContext>(CHANGE_LINK_SCENE);

change_link_scene.enter(async ctx => {
  return await ctx.replyWithHTML("<b>Пришли мне новую ссылку на канал!</b>", Markup.keyboard([CONTROL_PANEL]).resize());
});

export { change_link_scene };