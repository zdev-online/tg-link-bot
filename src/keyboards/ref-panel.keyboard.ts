import { Markup } from "telegraf"
import { GET_REF_LINK } from "../keyboard.buttons";

export const getRefKeyboard = () => {
  return Markup.keyboard(
    [
      GET_REF_LINK
    ]
  ).resize();
}