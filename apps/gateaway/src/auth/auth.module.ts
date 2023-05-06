import { AuthModule as AppAuthModule } from '@auth-app/auth.module';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { authClientFactory } from '@providers';
import { AuthController } from './auth.controller';

@Module({
    imports: [ClientsModule.registerAsync([...authClientFactory()]), AppAuthModule],
    controllers: [AuthController],
})
export class AuthModule {}
