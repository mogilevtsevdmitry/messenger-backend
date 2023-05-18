import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService) {}

    async send() {
        this.mailerService.sendMail({
            to: 'zitpot.ru@gmail.com',
            from: 'noreply@nestjs.com',
            subject: 'Testing Nest MailerModule ✔',
            text: 'welcome',
            html: '<b>welcome</b>',
        });
    }
}
