import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { notificationClientFactory, ProvidersModule } from '@providers';
import { SharedModule } from '@shared';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';

@Module({
    imports: [SharedModule, ProvidersModule, ClientsModule.registerAsync([...notificationClientFactory()])],
    controllers: [NotificationController],
    providers: [NotificationService],
})
export class NotificationModule {}
