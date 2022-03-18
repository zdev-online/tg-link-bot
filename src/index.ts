import Sessions from 'telegraf-session-local';
import { bot, sequelize } from "./config";
import handlers from './handlers';
import { init_middleware } from './middleware';
import { UsersModel } from './models';
import { stage } from "./scenes";
import { logger } from "./utils";

async function bootstrap() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    logger.log(`Успешное подключение к базе данных!`);
    await bot.launch({ dropPendingUpdates: true });
    logger.log(`Успешное подключение к telegram!`);
    logger.log(`Бот запущен!`);
  } catch (e: any) {
    return logger.error(`Ошибка запуска бота: ${e.message}`);
  }
}

bootstrap();

bot.on('message', init_middleware);
bot.on('message', new Sessions({ storage: Sessions.storageMemory }));
bot.on('message', stage.middleware());

bot.on('my_chat_member', async ctx => {
  if (ctx.myChatMember.new_chat_member.status == 'kicked') {
    const user = await UsersModel.findOne({
      where: {
        tg_id: ctx.from.id
      }
    });
    if (!user) { return; }
    user.isActive = false;
    return await user.save();
  } else if (ctx.myChatMember.new_chat_member.status == 'member') {
    const user = await UsersModel.findOne({
      where: {
        tg_id: ctx.from.id
      }
    });
    if (!user) { return; }
    user.isActive = true;
    return await user.save();
  }
});

handlers(bot);