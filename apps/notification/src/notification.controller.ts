import { SendEmailNamespace } from '@contracts/services/notification';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { NotificationService } from './notification.service';

@Controller()
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    @MessagePattern(SendEmailNamespace.MessagePattern)
    sendEmail() {
        console.log(`triggered`);
        return this.notificationService.sendEmail();
    }
}
