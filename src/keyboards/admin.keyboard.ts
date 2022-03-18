import { Markup } from 'telegraf';
import { ADD_CHANNEL, CHANGE_LINK, CHANGE_TEXT, GET_REF_LINK, GET_REF_STATS, GET_STATS, USER_STATS } from '../keyboard.buttons';

export const getAdminKeyboard = () => Markup.keyboard([
  [
    Markup.button.text(ADD_CHANNEL),
    Markup.button.text(GET_STATS),
  ], [
    Markup.button.text(CHANGE_TEXT),
    Markup.button.text(CHANGE_LINK),
  ], [
    Markup.button.text(GET_REF_LINK),
  ], [
    Markup.button.text(GET_REF_STATS),
    Markup.button.text(USER_STATS)
  ]
]).resize();