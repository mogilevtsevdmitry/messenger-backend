import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { userClientFactory } from '@providers';
import { UserService } from './user.service';
import { ChatService } from './chat.service';

const services = [UserService];

@Module({
    imports: [ClientsModule.registerAsync([...userClientFactory()])],
    providers: [...services, ChatService],
    exports: [...services],
})
export class ServicesModule {}
