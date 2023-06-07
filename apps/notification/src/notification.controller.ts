import { SendEmailNamespace } from '@contracts/services/notification';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotificationService } from './notification.service';

@Controller()
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    @EventPattern(SendEmailNamespace.EventPattern.cmd)
    sendEmail(@Payload() data) {
        console.log(`triggered`, data);
        return this.notificationService.sendEmail();
    }
}
