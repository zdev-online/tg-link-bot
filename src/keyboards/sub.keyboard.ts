import { Markup } from "telegraf";
import { SUB_BUTTON } from "../keyboard.buttons";

export const getUserSubKeyboard = () => Markup.keyboard([
  Markup.button.text(SUB_BUTTON)
]);