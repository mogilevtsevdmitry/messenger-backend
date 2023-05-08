import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PrismaService } from '@providers/prisma/prisma.service';
import { UserPayload } from '@shared/decorators';
import { Tokens } from '@shared/interfaces';
import { Observable } from 'rxjs';
import { loginWithEmail, refreshTokens, register, validate } from '../cases';
import { TokenService } from './token.service';
import { LoginWithEmailNamespace, RegisterWithEmailNamespace } from '@contracts/services/auth';

@Injectable()
export class AuthService {
    constructor(
        @Inject('USER_SERVICE') private client: ClientProxy,
        private readonly tokenService: TokenService,
        private readonly prisma: PrismaService,
    ) {}

    validate(userId: string): Observable<UserPayload> {
        return validate(userId, this.client);
    }

    loginWithEmail(loginUserDto: LoginWithEmailNamespace.Request): Observable<Tokens> {
        return loginWithEmail(loginUserDto, this.client, this.tokenService, this.prisma);
    }

    register(registerUserDto: RegisterWithEmailNamespace.Request): Observable<unknown> {
        return register(registerUserDto, this.client);
    }

    refreshTokens(refreshToken: string): Observable<Tokens> {
        return refreshTokens(refreshToken, this.client, this.prisma, this.tokenService);
    }
}
