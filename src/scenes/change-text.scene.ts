import { Composer, Markup, Scenes } from "telegraf";
import { BotContext } from "../interfaces";
import { CONTROL_PANEL } from "../keyboard.buttons";
import { getAdminKeyboard } from "../keyboards";
import { CHANGE_TEXT_SCENE } from "../scene.ids";
import { getLinkedTextFromFile, saveDataToFile } from "../utils";

const get_text = new Composer<BotContext>();

get_text.on('text', async ctx => {
  saveDataToFile(ctx.message.text);
  await ctx.scene.leave();
  return await ctx.replyWithHTML(`Новая ссылка на канал выглядит так: ${getLinkedTextFromFile()}`, getAdminKeyboard());
});

const change_text_scene = new Scenes.WizardScene<BotContext>(CHANGE_TEXT_SCENE);

change_text_scene.enter(async ctx => {
  return await ctx.replyWithHTML("<b>Пришли мне новый текст для ссылки на канал!</b>", Markup.keyboard([CONTROL_PANEL]).resize());
});

export { change_text_scene };