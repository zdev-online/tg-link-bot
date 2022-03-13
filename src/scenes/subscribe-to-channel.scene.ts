import { Composer, Markup, Scenes } from 'telegraf';
import { BotContext } from '../interfaces';
import { SUB_BUTTON } from '../keyboard.buttons';
import { getUserSubKeyboard } from '../keyboards';
import { ChannelsModel, SubsModel } from '../models';
import { SUB_TO_CHANNELS_SCENE } from '../scene.ids';
import { getLinkedTextFromFile, logger, user_subscribed } from '../utils';
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
    return await ctx.replyWithHTML(getFinishSubscribeMessage(getLinkedTextFromFile()), {
      ...Markup.removeKeyboard(),
      disable_web_page_preview: true
    });
  }

  return await ctx.replyWithHTML(ctx.scene.session.message, {
    ...getUserSubKeyboard(),
    disable_web_page_preview: true
  });
});

const subscribe_to_channel_scene = new Scenes.WizardScene<BotContext>(SUB_TO_CHANNELS_SCENE, check_step);

subscribe_to_channel_scene.enter(async ctx => {
  if (!ctx.from) { return; }

  const channels = await ChannelsModel.findAll();
  logger.debug(`Каналов: ${channels.length}`);
  logger.debug(`Названия: ${channels.map(x => x.name).join(', ')}`);

  if (!channels.length) {
    logger.debug(`Каналов нет!`.cyan);
    await ctx.scene.leave();
    return await ctx.replyWithHTML(getFinishSubscribeMessage(getLinkedTextFromFile()), {
      ...Markup.removeKeyboard(),
      disable_web_page_preview: true
    });
  }

  const subscribed = await user_subscribed(ctx.telegram, channels.filter(x => x.type == 'username').map(x => x.link), ctx.from.id);

  if (subscribed) {
    logger.debug(`Подписан на все каналы`.cyan)
    await ctx.scene.leave();
    return await ctx.replyWithHTML(getFinishSubscribeMessage(getLinkedTextFromFile()), {
      ...Markup.removeKeyboard(),
      disable_web_page_preview: true
    });
  }

  ctx.scene.session.channels = channels;
  ctx.scene.session.message = getChannelsList(channels);

  logger.debug(`Выдал сообщение с каналами`.cyan)

  return await ctx.replyWithHTML(ctx.scene.session.message, {
    ...getUserSubKeyboard(),
    disable_web_page_preview: true
  });
});

export { subscribe_to_channel_scene };