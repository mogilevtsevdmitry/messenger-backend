import { SendConfirmationNamespace } from '@contracts/services/notification';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { NotificationService } from './notification.service';

@Controller()
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    @MessagePattern({ ...SendConfirmationNamespace.MessagePattern })
    sendConfirmationEmail() {
        console.log(`triggered`);
        return this.notificationService.sendConfirmationEmail();
    }
}
