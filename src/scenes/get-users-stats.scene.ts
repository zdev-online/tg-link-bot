import dayjs from "dayjs";
import { Scenes } from "telegraf";
import { BotContext } from "../interfaces";
import { UsersModel } from "../models";
import { GET_USERS_SCENE } from "../scene.ids";

const get_users_stats_scene = new Scenes.WizardScene<BotContext>(GET_USERS_SCENE, async ctx => {});

get_users_stats_scene.enter(async ctx => { 
  const users = await UsersModel.findAll();

  let message = `Статистика бота (${dayjs().format("DD.MM.YYYY")}):\n\n`;

  message += `Всего пользователей: ${users.length}\n`;
  message += `Активных пользователей: ${users.filter(x => x.isActive).length}\n`;
  message += `Неактивных пользователей: ${users.filter(x => !x.isActive).length}`;

  await ctx.replyWithHTML(message);

  return await ctx.scene.leave();
});

export { get_users_stats_scene }