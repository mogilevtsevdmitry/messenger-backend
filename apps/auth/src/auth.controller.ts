import { LoginWithEmailNamespace, RegisterWithEmailNamespace } from '@contracts/services/auth';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './services/auth.service';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @MessagePattern(LoginWithEmailNamespace.MessagePattern)
    loginWithEmail(loginUserDto: LoginWithEmailNamespace.Request) {
        return this.authService.loginWithEmail(loginUserDto);
    }

    @MessagePattern(RegisterWithEmailNamespace.MessagePattern)
    registerWithEmail(registerUserDto: RegisterWithEmailNamespace.Request) {
        return this.authService.register(registerUserDto);
    }

    @MessagePattern({ cmd: 'refresh-tokens' })
    refreshToken(refreshToken: string) {
        return this.authService.refreshTokens(refreshToken);
    }
}
