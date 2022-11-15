import { Telegraf } from "telegraf";

export const bot = new Telegraf(process.env.TELEGRAM_BOT_KEY || "");

export const sendTelegramMessage = (message: string) => {
  bot.telegram.sendMessage(-676164038, message, { parse_mode: "Markdown" });
};
