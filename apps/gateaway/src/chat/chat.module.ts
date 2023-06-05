import { AuthModule } from '@auth-app/auth.module';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { chatClientFactory, userClientFactory } from '@providers';
import { ChatGateway } from './chat.gateway';
import { ChatController } from './chat.controller';

@Module({
    imports: [ClientsModule.registerAsync([...userClientFactory(), ...chatClientFactory()]), AuthModule],
    providers: [ChatGateway],
    controllers: [ChatController],
})
export class ChatModule {}
