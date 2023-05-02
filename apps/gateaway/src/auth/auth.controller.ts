import { Body, Controller, HttpException, HttpStatus, Inject, Post, Res } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '@shared/decorators';
import { Response } from 'express';
import { catchError, of, tap } from 'rxjs';
import { LoginUserDto, RegisterWithEmailUserDto, RegisterWithPhoneUserDto } from './dto';

@Public()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(@Inject('AUTH_SERVICE') private client: ClientProxy) {}

    @ApiOperation({
        summary: 'Аутентификация',
        description: 'Вход через email и пароль',
    })
    @ApiBody({ type: LoginUserDto })
    @Post('login')
    async login(@Body() data: LoginUserDto, @Res() res: Response) {
        return this.client.send({ cmd: 'login' }, data).pipe(
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
    @ApiBody({ type: RegisterWithEmailUserDto })
    @Post('register/email')
    async registerByEmail(@Body() data: RegisterWithEmailUserDto) {
        return this.client.send({ cmd: 'register-email' }, data).pipe(
            catchError((err) => {
                throw new HttpException({ message: err.message }, HttpStatus.BAD_REQUEST);
            }),
        );
    }

    @ApiOperation({
        summary: 'Регистрация тел номер',
        description: 'Регистрация с помощью тел номера',
        deprecated: true,
    })
    @ApiBody({ type: RegisterWithPhoneUserDto })
    @Post('register/phone')
    async registerByPhone(@Body() data: RegisterWithPhoneUserDto) {
        return this.client.send({ cmd: 'register-phone' }, data);
    }
}
