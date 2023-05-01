import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './services/auth.service';
import { Public } from '@shared/decorators';

@Public()
@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @MessagePattern({ cmd: 'login' })
    login(loginUserDto) {
        return this.authService.login(loginUserDto);
    }

    @MessagePattern({ cmd: 'register-email' })
    regiaterEmail(registerUserDto) {
        console.log({ registerUserDto });
        return this.authService.register(registerUserDto);
    }
}
