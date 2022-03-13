import { Context, NarrowedContext } from "telegraf";
import * as tt from 'telegraf/src/telegram-types';

export type MatchedContext<
  C extends Context,
  T extends tt.UpdateType | tt.MessageSubType
  > = NarrowedContext<C, tt.MountMap[T]>
