import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { userClientFactory } from '@providers';
import { UserService } from './user.service';

const services = [UserService];

@Module({
    imports: [ClientsModule.registerAsync([...userClientFactory()])],
    providers: [...services],
    exports: [...services],
})
export class ServicesModule {}
