import { Module } from '@nestjs/common';
import { ProvidersModule } from '@providers';
import { SharedModule } from '@shared';
import { UserValidation } from './cases/user.validation';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [ProvidersModule, SharedModule],
    controllers: [UserController],
    providers: [UserService, UserValidation],
})
export class UserModule {}
