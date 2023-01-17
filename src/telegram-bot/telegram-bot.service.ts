import { Injectable } from '@nestjs/common';
import { Hears, Help, InjectBot, On, Start } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { MyBotName } from '../app.constants';

@Injectable()
export class TelegramBotService {
  constructor(@InjectBot(MyBotName) private readonly bot: Telegraf<Context>) {}

  async sendMessage(message: string) {
    try {
      await this.bot.telegram.sendChatAction(
        process.env.TELEGRAM_ADMIN_ID,
        'typing',
      );
      await this.bot.telegram.sendMessage(
        process.env.TELEGRAM_ADMIN_ID,
        message,
      );

      return true;
    } catch (error) {
      console.log(`Telegram bot bilan bog'lik xatolik \n ${error}`);
    }
  }
}
