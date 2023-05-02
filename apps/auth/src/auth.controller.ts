import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Public } from '@shared/decorators';
import { AuthService } from './services/auth.service';

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
        return this.authService.register(registerUserDto);
    }
}
