import { Scenes } from 'telegraf';
import { BotContext } from '../interfaces';
import { SUB_TO_CHANNELS_SCENE } from '../scene.ids';

const subscribe_to_channel_scene = new Scenes.WizardScene<BotContext>(SUB_TO_CHANNELS_SCENE);

subscribe_to_channel_scene.enter(async ctx => {});

export { subscribe_to_channel_scene };