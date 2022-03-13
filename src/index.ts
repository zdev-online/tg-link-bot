import Sessions from 'telegraf-session-local';
import { bot, sequelize } from "./config";
import handlers from './handlers';
import { init_middleware } from './middleware';
import { stage } from "./scenes";
import { logger } from "./utils";

async function bootstrap() {
  try {
    await sequelize.authenticate();
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

handlers(bot);