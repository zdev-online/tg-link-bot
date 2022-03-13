import { Telegram } from "telegraf";
import { logger } from ".";

const disallowed_statuses = ['kicked', 'left'];

export const user_subscribed = async (api: Telegram, channels_links: string[], user_id: number): Promise<boolean> => {
  logger.debug(channels_links.join(', ').cyan);

  for (let i = 0; i < channels_links.length; i++) {
    const data = await api.getChatMember(`@${channels_links[i]}`, user_id);
    if (disallowed_statuses.includes(data.status)) {
      logger.debug(`${user_id} - не подписан на ${channels_links[i]}`);
      return false;
    }
    logger.debug(`${user_id} - подписан на ${channels_links[i]}`);
  }
  return true;
}