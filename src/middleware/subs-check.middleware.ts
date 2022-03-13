import { BotContext, MatchedContext, TNextFunction } from "../interfaces";
import { SUB_TO_CHANNELS_SCENE } from "../scene.ids";
import { is_admin } from "../utils";

export const subs_check_middleware = async (ctx: MatchedContext<BotContext, 'message'>, next: TNextFunction) => {
  if (is_admin(ctx.from.id)) {
    return await next();
  } else {
    return await ctx.scene.enter(SUB_TO_CHANNELS_SCENE);
  }
}