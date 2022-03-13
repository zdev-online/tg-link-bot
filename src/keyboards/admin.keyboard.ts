import { Markup } from 'telegraf';
import { ADD_CHANNEL, GET_STATS } from '../keyboard.buttons';

export const getAdminKeyboard = () => Markup.keyboard([
  [
    Markup.button.text(ADD_CHANNEL),
    Markup.button.text(GET_STATS),
  ],
]);