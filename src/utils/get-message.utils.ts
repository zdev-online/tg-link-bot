import { ChannelsModel, SubsModel } from "../models";

export const getStartAdminMessage = () => `Вы попали в панель управления ботом!`;

export const getChannelsList = (channels: ChannelsModel[]) => {
  let message = `Привет! Все фильмы с TikTok мы собрали в этом сообществе. Подпишись сначала на наши каналы и получи то, что искал!\n\n`;

  message += channels.map(x => `> <a href="${x.type == 'link' ? x.link : `https://t.me/${x.link}`}">${x.name}</a>`).join('\n');

  return message;
}

export const getFinishSubscribeMessage = (text_with_link: string): string => [
  `🔒 Доступ успешно открыт. Все фильмы с TikTok, а также с наших секретных каналов вы можете посмотреть в нашем приватном канале!`,
  text_with_link,
  `⚠ Если вы хотите смотреть качественные подборки фильмов — советуем подписаться на данный канал`
].join('\n');


export const getFullChannelStats = (channel: ChannelsModel, subs: SubsModel[]): string => {
  const days = [];
  for (let i = 0; i < subs.length; i++) {
    const sub = subs[i];
    const idx = days.findIndex(x => x.day == sub.date);
    if (idx == -1) {
      days.push({
        day: sub.date,
        count: 1
      });
    } else {
      days[idx].count++;
    }
  }
  let message = `Статистика канала <a href="${channel.type == 'link' ? channel.link : `https://t.me/${channel.link}`}">${channel.name}</a>:\n\n`;
  message += `Подписалось за всё время: ${channel.subs}\n\n`;
  days.forEach(x => {
    message += `За ${x.day} - подписалось ${x.count}\n`;
  });
  return message; 
}

export const getAdminChannelsList = (pages: ChannelsModel[][], page: number) => {
  let message = `Список каналов. Страница ${page + 1}/${pages.length}:\n`;
  message += pages[page].map((x, i) => `${i + 1}. <a href="${x.type == 'link' ? x.link : `https://t.me/${x.link}`}">${x.name}</a>`).join('\n');
  message += `\n\nНажмите кнопку с номером канала, чтобы получить статистику!`;
  return message;
}