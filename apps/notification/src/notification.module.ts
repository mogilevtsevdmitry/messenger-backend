import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { notificationClientFactory, ProvidersModule } from '@providers';
import { SharedModule } from '@shared';
import { join } from 'path';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { EmailService } from './email/email.service';

@Module({
    imports: [
        SharedModule,
        ProvidersModule,
        ClientsModule.registerAsync([...notificationClientFactory()]),
        MailerModule.forRoot({
            transport: {
                host: 'smtp.example.com',
                secure: false,
                auth: {
                    user: `user@example.com`,
                    pass: `anypass`,
                },
            },
            defaults: {
                from: '"No Reply" <noreply@example.com>',
            },
            template: {
                dir: join(__dirname, 'templates'),
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true,
                },
            },
        }),
    ],
    controllers: [NotificationController],
    providers: [NotificationService, EmailService],
    exports: [NotificationService],
})
export class NotificationModule {}
