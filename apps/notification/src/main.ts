import { NOTIFICATION_SERVICE } from '@contracts/services/notification';
import { Logger } from '@nestjs/common/services';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { notificationClientProvider } from '@providers';
import { NotificationModule } from './notification.module';

async function bootstrap() {
    const config = new ConfigService();
    const port = config.get<number>('NOTIFICATION_API_PORT', 5003);
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        NotificationModule,
        notificationClientProvider(config),
    );

    await app.listen().then(() => {
        Logger.log(`NotificationMicroservice started on "${port}"`, NOTIFICATION_SERVICE);
    });
}
bootstrap();
