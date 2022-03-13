import { Sequelize } from 'sequelize-typescript';
import { ChannelsModel, SubsModel } from '../models';
import { logger } from '../utils';
import config from './config.json';

export const sequelize: Sequelize = new Sequelize({
  dialect: 'mysql',
  ...config.database,
  logging: (sql: string, timing) => logger.debug(`[DB][${timing ? `${timing} мс.` : 'NoTime'}] -> ${sql}`),
  models: [ChannelsModel, SubsModel],
  benchmark: config.logger.debugs,
  define: {
    charset: 'utf8mb4'
  }
});