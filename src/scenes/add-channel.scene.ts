import { Composer, Markup, Scenes, TelegramError } from "telegraf";
import { BotContext } from "../interfaces";
import { CONTROL_PANEL } from "../keyboard.buttons";
import { getAdminKeyboard } from "../keyboards/admin.keyboard";
import { ChannelsModel } from "../models";
import { ADD_CHANNEL_SCENE } from "../scene.ids";

const get_name_step = new Composer<BotContext>();

get_name_step.on('text', async ctx => {
  ctx.scene.session.name = ctx.message.text;
  await ctx.replyWithHTML("<b>Теперь пришли мне ссылку или @channel_username канала!</b>");
  return ctx.wizard.next();
});

const get_link_step = new Composer<BotContext>();

get_link_step.hears(/(http(s)?:\/\/)?t(elegram)?.me\//i, async ctx => {

  ctx.scene.session.link = ctx.message.text;

  await ChannelsModel.create({
    link: ctx.scene.session.link,
    name: ctx.scene.session.name,
    type: 'link'
  });

  await ctx.replyWithHTML(
    `Канал <a href="${ctx.message.text}">${ctx.scene.session.name}</a> добавлен в обязательные подписки!`,
    getAdminKeyboard()
  );

  return await ctx.scene.leave();
});
get_link_step.hears(/^@.*$/i, async ctx => {
  try {
    const chat = await ctx.tg.getChat(ctx.message.text);
    // Если @channel_username - не канал
    if (chat.type != 'channel') {
      return await ctx.replyWithHTML("<b>Ссылка не является ссылкой на канал!</b>\n<b>Проверьте ссылку и попробуйте снова!</b>");
    }

    ctx.scene.session.link = ctx.message.text.replace("@", "");

    await ChannelsModel.create({
      link: ctx.scene.session.link,
      name: ctx.scene.session.name,
      type: 'username'
    });

    await ctx.replyWithHTML(
      `Канал <a href="https://t.me/${ctx.message.text.replace("@", "")}">${ctx.scene.session.name}</a> добавлен в обязательные подписки!`,
      getAdminKeyboard()
    );

    return await ctx.scene.leave();
  } catch (e: any) {
    // Если бот не админ в канале!
    if (e instanceof TelegramError) {
    }
    throw e;
  }
});

const add_channel_scene = new Scenes.WizardScene<BotContext>(ADD_CHANNEL_SCENE);

add_channel_scene.enter(async ctx => {
  return await ctx.replyWithHTML("<b>Пришли мне название канала, которое будет отображаться в боте!</b>", Markup.keyboard([
    Markup.button.text(CONTROL_PANEL)
  ]));
});

export { add_channel_scene }