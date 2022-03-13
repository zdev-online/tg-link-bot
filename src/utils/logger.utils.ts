import 'colors';
import dayjs from 'dayjs';
import { config } from '../config';

export const log = (...args: any[]): void => {
  const time: string = dayjs().format('[| LOG] HH:mm:ss, DD.MM.YYYY [->]');
  config.logger.logs && console.log(`${time} ${args.join(' ')}`.green);
}

export const error = (...args: any[]): void => {
  const time: string = dayjs().format('[| ERROR] HH:mm:ss, DD.MM.YYYY [->]');
  config.logger.errors && console.error(`${time} ${args.join(' ')}`.red);
}

export const warn = (...args: any[]): void => {
  const time: string = dayjs().format('[| WARN] HH:mm:ss, DD.MM.YYYY [->]');
  config.logger.warns && console.warn(`${time} ${args.join(' ')}`.yellow);
}

export const debug = (...args: any[]): void => {
  const time: string = dayjs().format('[| DEBUG] HH:mm:ss, DD.MM.YYYY [->]');
  config.logger.debugs && console.debug(`${time} ${args.join(' ')}`.gray);
}