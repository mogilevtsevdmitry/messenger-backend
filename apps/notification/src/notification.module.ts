import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { getEmailConfig, notificationClientFactory, ProvidersModule } from '@providers';
import { SharedModule } from '@shared';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { EmailService } from './email/email.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        SharedModule,
        ProvidersModule,
        ClientsModule.registerAsync([...notificationClientFactory()]),
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getEmailConfig,
        }),
    ],
    controllers: [NotificationController],
    providers: [NotificationService, EmailService],
    exports: [NotificationService],
})
export class NotificationModule {}
