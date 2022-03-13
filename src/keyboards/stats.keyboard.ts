import { Markup } from "telegraf";
import { BACK, CONTROL_PANEL, DELETE, NEXT_PAGE, PREV_PAGE } from "../keyboard.buttons";
import { ChannelsModel } from "../models";

export const getChannelStatsKeyboard = (pages: ChannelsModel[][], page: number) => { 
  const has_next_page = page + 1 < pages.length;
  const has_prev_page = page - 1 >= 0;
  const controls = [];
  const channels = pages[page].map((_, i) => Markup.button.text(`#${i + 1}`));

  has_next_page && controls.push(Markup.button.text(NEXT_PAGE));
  has_prev_page && controls.push(Markup.button.text(PREV_PAGE));

  const keyboard = [
    channels,
    controls,
    [
      Markup.button.text(CONTROL_PANEL)
    ]
  ];
 
  return Markup.keyboard(keyboard).resize();
}

export const getChannelKeyboard = () => {
  return Markup.keyboard([
    [
      Markup.button.text(DELETE),
      Markup.button.text(BACK)
    ]
  ]).resize();
}