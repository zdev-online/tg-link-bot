import { BotContext, MatchedContext, TNextFunction } from "../interfaces";
import { error_handler } from "../utils";

export const init_middleware = async (ctx: MatchedContext<BotContext, 'message'>, next: TNextFunction) => {
  try {
    return await next();
  } catch (error: any) {
    return error_handler(ctx, error);
  }
}