import { Module } from '@nestjs/common';
import { ProvidersModule } from '@providers';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [ProvidersModule],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
