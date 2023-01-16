import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(email: string, message: string) {
    try {
      const result = await this.mailerService.sendMail({
        to: email, // list of receivers
        subject: message,
        text: 'message', // plaintext body
        html: '<b>welcome</b>', // HTML body content
      });

      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  }
}
