import { User } from "telegraf/typings/core/types/typegram";
import { logger } from ".";
import { BotContext } from "../interfaces";
import { ReferalsModel, UsersModel } from "../models";
import { is_admin } from "./is-admin.utils";

export const create_user = async (ctx: BotContext & { from: User }): Promise<UsersModel> => {
  const {
    from: {
      first_name,
      last_name,
      username,
      id
    }
  } = ctx;

  const user = await UsersModel.create({
    nickname: `${first_name}${last_name ? ` ${last_name}` : ''}`,
    tg_id: id,
    username: username,
    can_create_link: is_admin(id)
  });

  if (ctx?.scene?.session?.state?.code) {
    const from = await UsersModel.findOne({
      where: {
        referal_code: ctx.scene.session.state.code
      }
    });
    if (!from) {
      logger.debug(`[ReferalFrom] - not found`.cyan);
      return user;
    }

    await ReferalsModel.create({
      user_id: id,
      from_id: from.id
    });

    logger.debug(`[ReferalFrom] - new_referal for ${from.tg_id}`.cyan);

    return user;
  }

  logger.debug(`[NoReferal] - ${id}`.cyan);

  return user;
}