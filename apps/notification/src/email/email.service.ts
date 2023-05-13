import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService) {}

    async send() {
        this.mailerService.sendMail({
            to: 'zitpot.ru@gmail.com', // list of receivers
            from: 'noreply@nestjs.com', // sender address
            subject: 'Testing Nest MailerModule ✔', // Subject line
            text: 'welcome', // plaintext body
            html: '<b>welcome</b>', // HTML body content
        });
    }
}
