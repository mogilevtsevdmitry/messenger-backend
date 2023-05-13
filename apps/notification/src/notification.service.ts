import { Injectable } from '@nestjs/common';
import { EmailService } from './email/email.service';

@Injectable()
export class NotificationService {
    constructor(private readonly emailService: EmailService) {}

    sendConfirmationEmail() {
        return this.emailService.send();
    }
}
