import { Body, Controller, HttpStatus, Inject, Post, Res, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
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
    constructor(@Inject('AUTH_SERVICE') private client: ClientProxy, private readonly configService: ConfigService) {}

    @ApiOperation({
        summary: 'Аутентификация',
        description: 'Вход через email и пароль',
    })
    @ApiOkResponse({ type: LoginResponse })
    @Post('login/email')
    async loginWithEmail(@Body() data: LoginWithEmailDto, @Res() res: Response) {
        return this.client.send<Tokens>({ cmd: 'login/email' }, data).pipe(
            tap((tokens) => this.setResponseWithTokens(tokens, res)),
            handleTimeoutAndErrors(),
        );
    }

    @ApiOperation({
        summary: 'Регистрация email',
        description: 'Регистрация с помощью email и пароля',
    })
    @ApiOkResponse({ type: RegisterResponse })
    @Post('register/email')
    async registerByEmail(@Body() data: RegisterWithEmailDto) {
        return this.client.send({ cmd: 'register/email' }, data).pipe(
            map((user) => !!user),
            handleTimeoutAndErrors(),
        );
    }

    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Обновление токенов',
        description: 'Обновление пары токенов',
    })
    @ApiOkResponse({ type: LoginResponse })
    @Post('refresh-tokens')
    refreshTokens(@Cookies(REFRESH_TOKEN) refreshToken: string, @Res() res: Response) {
        if (!refreshToken) {
            throw new UnauthorizedException();
        }
        return this.client.send<Tokens>({ cmd: 'refresh-tokens' }, refreshToken).pipe(
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
            secure: this.configService.get('NODE_ENV') === 'production',
        });
        res.status(HttpStatus.CREATED).json({ accessToken: tokens.accessToken });
    }
}
