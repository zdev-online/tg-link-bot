import { Composer, Markup, Scenes } from 'telegraf';
import { BotContext } from '../interfaces';
import { SUB_BUTTON } from '../keyboard.buttons';
import { getUserSubKeyboard } from '../keyboards';
import { ChannelsModel, SubsModel } from '../models';
import { SUB_TO_CHANNELS_SCENE } from '../scene.ids';
import { getLinkedTextFromFile, user_subscribed } from '../utils';
import { getChannelsList, getFinishSubscribeMessage } from '../utils/get-message.utils';

const check_step = new Composer<BotContext>();

check_step.hears(SUB_BUTTON, async ctx => {
  const channels: ChannelsModel[] = ctx.scene.session.channels;

  const subscribed = await user_subscribed(ctx.telegram, channels.filter(x => x.type == 'username').map(x => x.link), ctx.from.id);
  if (subscribed) {
    for (let i = 0; i < channels.length; i++) {
      const channel = channels[i];
      const sub_check = await SubsModel.findOne({
        where: {
          channel_id: channel.id,
          user_id: ctx.from.id
        }
      });
      if (!sub_check) {
        channel.subs++;
        await channel.save();
        await SubsModel.create({ channel_id: channel.id, user_id: ctx.from.id });
      }
    }
    await ctx.scene.leave();
    return await ctx.replyWithHTML(getFinishSubscribeMessage(getLinkedTextFromFile()), Markup.removeKeyboard());
  }

  return await ctx.replyWithHTML(ctx.scene.session.message, getUserSubKeyboard());
});

const subscribe_to_channel_scene = new Scenes.WizardScene<BotContext>(SUB_TO_CHANNELS_SCENE, check_step);

subscribe_to_channel_scene.enter(async ctx => {
  if (!ctx.from) { return; }

  const channels = await ChannelsModel.findAll();
  if (channels.length) {
    await ctx.scene.leave();
    return await ctx.replyWithHTML(getFinishSubscribeMessage(getLinkedTextFromFile()), Markup.removeKeyboard());
  }

  const subscribed = await user_subscribed(ctx.telegram, channels.filter(x => x.type == 'username').map(x => x.link), ctx.from.id);

  if (subscribed) {
    await ctx.scene.leave();
    return await ctx.replyWithHTML(getFinishSubscribeMessage(getLinkedTextFromFile()), Markup.removeKeyboard());
  }

  ctx.scene.session.channels = channels;
  ctx.scene.session.message = getChannelsList(channels);

  return await ctx.replyWithHTML(ctx.scene.session.message, getUserSubKeyboard());
});

export { subscribe_to_channel_scene };