import { CHAT_SERVICE } from '@contracts/services/chat';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { chatClientProvider } from '@providers';
import { ChatModule } from './chat.module';

async function bootstrap() {
    const config = new ConfigService();
    const port = config.get<number>('CHAT_API_PORT', 5004);
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(ChatModule, chatClientProvider(config));
    await app.listen().then(() => {
        Logger.log(`ChatMicroservice started on "${port}"`, CHAT_SERVICE);
    });
}
bootstrap();
