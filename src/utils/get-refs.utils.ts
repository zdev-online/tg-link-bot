import { ReferalsModel, UsersModel } from "../models";

export interface IGetRefs {
  day: string;
  users: ReferalsModel[]
}

export const get_refs = async (from_id: number): Promise<IGetRefs[]> => {
  const refs = await ReferalsModel.findAll({
    where: {
      from_id
    }
  });

  if (!refs.length) {
    return [];
  }

  const dates: IGetRefs[] = [];

  refs.forEach(ref => {
    const idx = dates.findIndex(x => x.day == ref.date);
    if(idx == -1){
      dates.push({
        day: ref.date,
        users: [ref]
      })
    } else {
      dates[idx].users.push(ref);
    }
  });

  return dates;
} 