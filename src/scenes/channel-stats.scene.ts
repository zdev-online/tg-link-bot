import { Scenes } from "telegraf";
import { BotContext } from "../interfaces";
import { CHANNEL_STATS_SCENE } from "../scene.ids";

const channel_stats_scene = new Scenes.WizardScene<BotContext>(CHANNEL_STATS_SCENE);

channel_stats_scene.enter(async ctx => { });

export { channel_stats_scene }