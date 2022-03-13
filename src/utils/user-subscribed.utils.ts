import { Telegram } from "telegraf";

const disallowed_statuses = ['kicked', 'left'];

export const user_subscribed = async (api: Telegram, channels_links: string[], user_id: number): Promise<boolean> => {
  for (let i = 0; i < channels_links.length; i++) {
    const data = await api.getChatMember(channels_links[i], user_id);
    if (disallowed_statuses.includes(data.status)) {
      return false;
    }
  }
  return true;
}