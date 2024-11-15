import { Scenes } from 'telegraf';
import { BotContext } from '../interfaces';
import { CONTROL_PANEL } from '../keyboard.buttons';
import { getAdminKeyboard } from '../keyboards/admin.keyboard';
import { is_admin } from '../utils';
import { getStartAdminMessage } from '../utils/get-message.utils';
import { add_channel_scene } from './add-channel.scene';
import { change_link_scene } from './change-link.scene';
import { change_text_scene } from './change-text.scene';
import { channel_stats_scene } from './channel-stats.scene';
import { get_refs_stats_scene } from './get-refs-stats.scene';
import { get_users_stats_scene } from './get-users-stats.scene';
import { subscribe_to_channel_scene } from './subscribe-to-channel.scene';

const stage = new Scenes.Stage<BotContext>([
  subscribe_to_channel_scene,
  add_channel_scene,
  channel_stats_scene,
  change_link_scene,
  change_text_scene,
  get_refs_stats_scene,
  get_users_stats_scene
]);

stage.hears(CONTROL_PANEL, async ctx => {
  if (is_admin(ctx.from.id)) {
    await ctx.scene.leave();
    return await ctx.replyWithHTML(getStartAdminMessage(), getAdminKeyboard());
  }
});

export { stage };
