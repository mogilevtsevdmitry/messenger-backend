import {
    BadRequestException,
    Body,
    Controller,
    HttpException,
    HttpStatus,
    Inject,
    Post,
    Res,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Cookies, Public } from '@shared/decorators';
import { Tokens } from '@shared/interfaces';
import {
    AuthContract,
    AuthServiceContract,
    AuthServiceController,
    LoginWithEmail,
    LoginWithEmailDto,
    RefreshTokens,
    RegisterWithEmail,
} from '@webmogilevtsev/messenger-api-dto';
import { Response } from 'express';
import { catchError, map, of, tap } from 'rxjs';

const REFRESH_TOKEN = 'refreshtoken';

@Public()
@ApiTags(AuthContract.tag)
@Controller(AuthContract.path)
export class AuthController {
    constructor(
        @Inject(AuthServiceContract.name) private client: ClientProxy,
        private readonly configService: ConfigService,
    ) {}

    @ApiOperation({
        summary: 'Аутентификация',
        description: 'Вход через email и пароль',
    })
    @ApiOkResponse({ type: LoginWithEmail.Response })
    @Post(LoginWithEmail.methodPath)
    async loginWithEmail(@Body() data: LoginWithEmailDto, @Res() res: Response) {
        return this.client
            .send<Tokens, LoginWithEmail.Request>(AuthServiceController.LoginWithEmailMessagePattern, data)
            .pipe(
                tap((tokens) => this._setResponseWithTokens(tokens, res)),
                catchError((err) => {
                    new BadRequestException(err.message);
                    return of(null);
                }),
            );
    }

    @ApiOperation({
        summary: 'Регистрация email',
        description: 'Регистрация с помощью email и пароля',
    })
    @ApiBody({ type: RegisterWithEmail.Request })
    @ApiOkResponse({ type: RegisterWithEmail.Response })
    @Post(RegisterWithEmail.methodPath)
    async registerByEmail(@Body() data: RegisterWithEmail.Request) {
        return this.client
            .send<RegisterWithEmail.Response, RegisterWithEmail.Request>(
                AuthServiceContract.AuthController.RegisterWithEmailMessagePattern,
                data,
            )
            .pipe(
                map((user) => !!user),
                catchError((err) => {
                    throw new HttpException({ message: err.message }, HttpStatus.BAD_REQUEST);
                }),
            );
    }

    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Обновление токенов',
        description: 'Обновление пары токенов',
    })
    @ApiOkResponse({ type: RefreshTokens.Response })
    @Post(RefreshTokens.methodPath)
    refreshTokens(@Cookies(REFRESH_TOKEN) refreshToken: string, @Res() res: Response) {
        if (!refreshToken) {
            throw new UnauthorizedException();
        }
        return this.client
            .send<Tokens, RefreshTokens.Request>(
                AuthServiceContract.AuthController.RefreshTokensMessagePattern,
                refreshToken,
            )
            .pipe(
                tap((tokens) => this._setResponseWithTokens(tokens, res)),
                catchError((err) => {
                    throw new HttpException({ message: err.message }, HttpStatus.BAD_REQUEST);
                }),
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

    private _setResponseWithTokens(tokens: Tokens, res: Response): void {
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
