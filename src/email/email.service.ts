import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(email: string, message: string) {
    try {
      await this.mailerService.sendMail({
        to: email, // list of receivers
        subject: message,
        text: 'message', // plaintext body
        html: "<b>Online ta'lim platformasiga xush kelibsiz!</b>", // HTML body content
      });
    } catch (error) {
      console.log(error.message);
    }
  }
}
