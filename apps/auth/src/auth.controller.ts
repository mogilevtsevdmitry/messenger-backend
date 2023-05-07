import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './services/auth.service';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @MessagePattern({ cmd: 'login/email' })
    loginWithEmail(loginUserDto) {
        return this.authService.loginWithEmail(loginUserDto);
    }

    @MessagePattern({ cmd: 'register/email' })
    registerWithEmail(registerUserDto) {
        return this.authService.register(registerUserDto);
    }

    @MessagePattern({ cmd: 'refresh-tokens' })
    refreshToken(refreshToken: string) {
        return this.authService.refreshTokens(refreshToken);
    }
}
