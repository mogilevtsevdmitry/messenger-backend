import { SendConfirmationNamespace } from '@contracts/services/notification';
import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { NotificationService } from './notification.service';

@Controller()
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    @EventPattern({ ...SendConfirmationNamespace.EventPattern })
    sendConfirmationEmail() {
        return this.notificationService;
    }
}
