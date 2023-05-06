import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PrismaService } from '@providers/prisma/prisma.service';
import { LoginWithEmailDto, RegisterWithEmailDto } from '@webmogilevtsev/messenger-api-dto';
import { login, refreshTokens, register, validate } from '../cases';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
    constructor(
        @Inject('USER_SERVICE') private client: ClientProxy,
        private readonly tokenService: TokenService,
        private readonly prisma: PrismaService,
    ) {}

    validate(userId: string) {
        return validate(userId, this.client);
    }

    login(loginUserDto: LoginWithEmailDto) {
        return login(loginUserDto, this.client, this.tokenService);
    }

    register(registerUserDto: RegisterWithEmailDto) {
        return register(registerUserDto, this.client);
    }

    refreshTokens(userId: string) {
        return refreshTokens(userId, this.client, this.prisma, this.tokenService);
    }
}
