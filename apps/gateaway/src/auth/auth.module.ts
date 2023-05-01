import { AuthModule as AppAuthModule } from '@auth-app/auth.module';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';

@Module({
    imports: [
        ClientsModule.register([
            { name: 'AUTH_SERVICE', transport: Transport.TCP, options: { port: 5001, host: 'localhost' } },
        ]),
        AppAuthModule,
    ],
    controllers: [AuthController],
})
export class AuthModule {}
