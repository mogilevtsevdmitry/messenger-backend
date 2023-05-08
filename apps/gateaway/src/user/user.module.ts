import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { userClientFactory } from '@providers';
import { UserModule as AppUserModule } from 'apps/user/src/user.module';
import { UserController } from './user.controller';
import { UsersController } from './users.controller';

@Module({
    imports: [ClientsModule.registerAsync([...userClientFactory()]), AppUserModule],
    controllers: [UsersController, UserController],
})
export class UserModule {}
