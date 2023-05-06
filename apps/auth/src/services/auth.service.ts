import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PrismaService } from '@providers/prisma/prisma.service';
import { UserPayload } from '@shared/decorators';
import { Tokens } from '@shared/interfaces';
import { LoginWithEmailDto, RegisterWithEmailDto, User } from '@webmogilevtsev/messenger-api-dto';
import { Observable } from 'rxjs';
import { login, refreshTokens, register, validate } from '../cases';
import { TokenService } from './token.service';

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

    login(loginUserDto: LoginWithEmailDto): Observable<Tokens> {
        return login(loginUserDto, this.client, this.tokenService);
    }

    register(registerUserDto: RegisterWithEmailDto): Observable<User | unknown> {
        return register(registerUserDto, this.client);
    }

    refreshTokens(userId: string): Observable<Tokens> {
        return refreshTokens(userId, this.client, this.prisma, this.tokenService);
    }
}
