import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { PrismaService } from '@providers/prisma/prisma.service';
import { login, refreshTokens, register, validate } from '../cases';
import { TokenService } from './token.service';

const testUser = {
    userId: '4a9f7816-e6bb-11ed-a05b-0242ac120003',
    email: 'test@mail.ru',
    roles: ['USER'],
};

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);
    constructor(
        @Inject('USER_SERVICE') private client: ClientProxy,
        private readonly config: ConfigService,
        private readonly tokenService: TokenService,
        private readonly prisma: PrismaService,
    ) {}

    validate(userId: string) {
        return validate(userId, this.config, this.client, testUser);
    }

    login(loginUserDto: { email: string; password: string }) {
        return login(loginUserDto, this.client, this.tokenService);
    }

    register(registerUserDto: { email: string; password: string }) {
        return register(registerUserDto, this.client);
    }

    refreshTokens(userId: string) {
        return refreshTokens(userId, this.client, this.prisma, this.tokenService);
    }
}
