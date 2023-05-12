import { CHAT_SERVICE } from '@contracts/services/chat';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ChatModule } from './chat.module';

async function bootstrap() {
    const config = new ConfigService();
    const port = config.get<number>('CHAT_API_PORT', 5004);
    const app = await NestFactory.create(ChatModule);
    app.useWebSocketAdapter(new IoAdapter(app));
    await app.listen(port);
    Logger.log(`ChatMicroservice started on "${await app.getUrl()}"`, CHAT_SERVICE);
}
bootstrap();
