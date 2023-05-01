import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { ProvidersModule } from '@providers';
import { SharedModule } from '@shared';
import { AuthController } from './auth.controller';
import { jwtModuleAsyncOptions } from './config';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { JwtStrategy } from './strategies';

@Module({
    imports: [
        SharedModule,
        PassportModule,
        JwtModule.registerAsync(jwtModuleAsyncOptions()),
        ClientsModule.register([
            { name: 'USER_SERVICE', transport: Transport.TCP, options: { port: 5002, host: 'localhost' } },
        ]),
        ProvidersModule,
    ],
    providers: [AuthService, JwtStrategy, TokenService],
    exports: [JwtStrategy, JwtModule],
    controllers: [AuthController],
})
export class AuthModule {}
