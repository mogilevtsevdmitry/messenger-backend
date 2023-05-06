import {
    Body,
    Controller,
    HttpException,
    HttpStatus,
    Inject,
    Post,
    Req,
    Res,
    UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '@shared/decorators';
import { Tokens } from '@shared/interfaces';
import {
    AuthContract,
    AuthServiceContract,
    AuthServiceController,
    LoginWithEmail,
    RefreshTokens,
    RegisterWithEmail,
} from '@webmogilevtsev/messenger-api-dto';
import { Request, Response } from 'express';
import { catchError, map, of, tap } from 'rxjs';

@ApiTags(AuthContract.tag)
@Controller(AuthContract.path)
export class AuthController {
    constructor(@Inject(AuthServiceContract.name) private client: ClientProxy) {}

    @ApiOperation({
        summary: 'Аутентификация',
        description: 'Вход через email и пароль',
    })
    @ApiBody({ type: LoginWithEmail.Request })
    @ApiOkResponse({ type: LoginWithEmail.Response })
    @Public()
    @Post(LoginWithEmail.methodPath)
    async login(@Body() data: LoginWithEmail.Request, @Res() res: Response) {
        return this.client
            .send<Tokens, LoginWithEmail.Request>(AuthServiceController.LoginWithEmailMessagePattern, data)
            .pipe(
                tap((tokens) => {
                    res.cookie('refreshtoken', tokens.refreshToken, {
                        httpOnly: true,
                        secure: true,
                        maxAge: new Date(tokens.refreshToken.exp).getMilliseconds(),
                    });
                    res.send({
                        accessToken: tokens.accessToken,
                    });
                }),
                catchError((err) => {
                    res.send({
                        statusCode: HttpStatus.BAD_REQUEST,
                        message: err,
                    }).status(HttpStatus.BAD_REQUEST);
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
    @Public()
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

    @ApiOperation({
        summary: 'Обновление токенов',
        description: 'Обновление пары токенов',
    })
    @ApiOkResponse({ type: RefreshTokens.Response })
    @Post(RefreshTokens.methodPath)
    refreshTokens(@Req() req: Request) {
        const refreshToken = req['refreshToken'];
        if (!refreshToken) {
            return new UnauthorizedException();
        }
        return this.client
            .send<RefreshTokens.Response, RefreshTokens.Request>(
                AuthServiceContract.AuthController.RefreshTokensMessagePattern,
                { refreshToken },
            )
            .pipe(
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
}
