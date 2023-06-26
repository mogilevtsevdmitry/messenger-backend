import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { ProvidersModule, userClientFactory } from '@providers';
import { ChatService } from './chat.service';
import { UserService } from './user.service';

const services = [UserService, ChatService];

@Module({
    imports: [ClientsModule.registerAsync([...userClientFactory()]), ProvidersModule],
    providers: [...services],
    exports: [...services],
})
export class ServicesModule {}
