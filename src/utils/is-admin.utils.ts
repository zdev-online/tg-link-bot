import { config } from "../config";

export const is_admin = (user_id: number) => config.admins.includes(user_id);