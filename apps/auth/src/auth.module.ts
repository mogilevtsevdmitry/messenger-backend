import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { jwtModuleAsyncOptions } from './config';
import { JwtStrategy } from './strategies';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SharedModule } from '@shared';

@Module({
    imports: [
        SharedModule,
        PassportModule,
        JwtModule.registerAsync(jwtModuleAsyncOptions()),
        ClientsModule.register([
            { name: 'USER_SERVICE', transport: Transport.TCP, options: { port: 5002, host: 'localhost' } },
        ]),
    ],
    providers: [AuthService, JwtStrategy],
    exports: [JwtStrategy],
})
export class AuthModule {}
