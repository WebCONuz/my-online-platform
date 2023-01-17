import { Module } from '@nestjs/common';
import { BotUpdate } from './bot.updates';
import { TelegramBotService } from './telegram-bot.service';

@Module({
  imports: [],
  providers: [TelegramBotService, BotUpdate],
  controllers: [],
  exports: [TelegramBotService],
})
export class TelegramBotModule {}
