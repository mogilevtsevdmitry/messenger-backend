import { LoginWithEmailMethod, RefreshTokensMethod, RegisterWithEmailMethod } from '@contracts/controllers/auth';
import {
    AUTH_SERVICE,
    LoginWithEmailNamespace,
    RefreshTokensNamespace,
    RegisterWithEmailNamespace,
} from '@contracts/services/auth';
import { Body, Controller, HttpStatus, Inject, Post, Res, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Cookies, Public } from '@shared/decorators';
import { handleTimeoutAndErrors } from '@shared/helpers';
import { Tokens } from '@shared/interfaces';
import { Response } from 'express';
import { map, tap } from 'rxjs';
import { LoginWithEmailDto, RegisterWithEmailDto } from './dto';
import { LoginResponse, RegisterResponse } from './responses';

const REFRESH_TOKEN = 'refreshtoken';

@Public()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(@Inject(AUTH_SERVICE) private client: ClientProxy, private readonly configService: ConfigService) {}

    @ApiOperation({
        summary: LoginWithEmailMethod.summary,
        description: LoginWithEmailMethod.description,
    })
    @ApiOkResponse({ type: LoginResponse })
    @Post(LoginWithEmailMethod.path)
    async loginWithEmail(@Body() data: LoginWithEmailDto, @Res() res: Response) {
        return this.client
            .send<LoginWithEmailNamespace.Response, LoginWithEmailNamespace.Request>(
                LoginWithEmailNamespace.MessagePattern,
                data,
            )
            .pipe(
                tap((tokens) => this.setResponseWithTokens(tokens, res)),
                handleTimeoutAndErrors(),
            );
    }

    @ApiOperation({
        summary: RegisterWithEmailMethod.summary,
        description: RegisterWithEmailMethod.description,
    })
    @ApiOkResponse({ type: RegisterResponse })
    @Post(RegisterWithEmailMethod.path)
    async registerByEmail(@Body() data: RegisterWithEmailDto) {
        return this.client
            .send<RegisterWithEmailNamespace.Response, RegisterWithEmailNamespace.Request>(
                RegisterWithEmailNamespace.MessagePattern,
                data,
            )
            .pipe(
                map((user) => !!user),
                handleTimeoutAndErrors(),
            );
    }

    @ApiOperation({
        summary: RefreshTokensMethod.summary,
        description: RefreshTokensMethod.description,
    })
    @ApiOkResponse({ type: LoginResponse })
    @Post(RefreshTokensMethod.path)
    refreshTokens(@Cookies(REFRESH_TOKEN) refreshToken: string, @Res() res: Response) {
        if (!refreshToken) {
            throw new UnauthorizedException();
        }
        return this.client
            .send<RefreshTokensNamespace.Response, RefreshTokensNamespace.Request>(
                RefreshTokensNamespace.MessagePattern,
                { refreshToken },
            )
            .pipe(
                tap((tokens) => this.setResponseWithTokens(tokens, res)),
                handleTimeoutAndErrors(),
            );
    }

    // @ApiOperation({
    //     summary: 'Регистрация тел номер',
    //     description: 'Регистрация с помощью тел номера',
    //     deprecated: true,
    // })
    // @ApiBody({ type: RegisterWithPhoneUserDto })
    // @Post('register/phone')
    // async registerByPhone(@Body() data: RegisterWithPhoneUserDto) {
    //     return this.client.send({ cmd: 'register-phone' }, data);
    // }

    private setResponseWithTokens(tokens: Tokens, res: Response): void {
        if (!tokens) {
            throw new UnauthorizedException();
        }
        res.cookie(REFRESH_TOKEN, tokens.refreshToken.token, {
            httpOnly: true,
            sameSite: 'strict',
            expires: new Date(tokens.refreshToken.exp),
            secure: this.configService.get('NODE_ENV', 'development') === 'production',
        });
        res.status(HttpStatus.CREATED).json({ accessToken: tokens.accessToken });
    }
}
