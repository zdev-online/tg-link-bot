import { Markup } from "telegraf";
import { NEXT_PAGE, PREV_PAGE, CONTROL_PANEL } from "../keyboard.buttons";
import { UsersModel } from "../models";

export const getRefStatsKeyboard = (pages: UsersModel[][], page: number) => { 
  const has_next_page = page + 1 < pages.length;
  const has_prev_page = page - 1 >= 0;
  const controls = [];
  const users = pages[page].map((_, i) => Markup.button.text(`#${i + 1}`));

  has_next_page && controls.push(Markup.button.text(NEXT_PAGE));
  has_prev_page && controls.push(Markup.button.text(PREV_PAGE));

  const keyboard = [
    users,
    controls,
    [
      Markup.button.text(CONTROL_PANEL)
    ]
  ];
 
  return Markup.keyboard(keyboard).resize();
}