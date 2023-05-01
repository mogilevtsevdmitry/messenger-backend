import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginUserDto, RegisterWithEmailUserDto, RegisterWithPhoneUserDto } from './dto';
import { Public } from '@shared/decorators';

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
    async login(@Body() data: LoginUserDto) {
        return this.client.send({ cmd: 'login' }, data);
    }

    @ApiOperation({
        summary: 'Регистрация email',
        description: 'Регистрация с помощью email и пароля',
    })
    @Public()
    @ApiBody({ type: RegisterWithEmailUserDto })
    @Post('register/email')
    async registerByEmail(@Body() data: RegisterWithEmailUserDto) {
        return this.client.send({ cmd: 'register-email' }, data);
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
