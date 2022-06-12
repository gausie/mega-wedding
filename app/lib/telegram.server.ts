import { Telegraf } from "telegraf";

export const bot = new Telegraf(
  "5574906501:AAEV6ztjU39JFKj97UumwCqYdZkHXlcYyro"
);

export const sendTelegramMessage = (message: string) => {
  bot.telegram.sendMessage(-676164038, message);
};
