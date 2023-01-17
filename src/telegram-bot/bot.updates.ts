import { UseFilters } from '@nestjs/common';
import { Command, Ctx, On, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { TelegramBotService } from './telegram-bot.service';

@Update()
// @UseFilters(TelegrafE)
export class BotUpdate {
  constructor(private readonly botService: TelegramBotService) {}

  //     @Start()
  //   async onStart(@Ctx() ctx: Context) {
  //     return this.botService.start(ctx);
  //   }

  //   @On("contact")
  //   async onContact(@Ctx() ctx: Context) {
  //     return this.botService.onContact(ctx);
  //   }

  //   @Command("stop")
  //   async onStop(@Ctx() ctx: Context) {
  //     return this.botService.onStop(ctx);
  //   }

  //   @On("message")
  //   async onMessage(@Ctx() ctx: Context) {
  //     return this.botService.start(ctx);
  //   }
}
