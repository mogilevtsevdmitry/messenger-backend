import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthServiceController } from '@webmogilevtsev/messenger-api-dto';
import { AuthService } from './services/auth.service';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @MessagePattern(AuthServiceController.LoginWithEmailMessagePattern)
    loginWithEmail(loginUserDto: AuthServiceController.LoginWithEmailRequest) {
        return this.authService.loginWithEmail(loginUserDto);
    }

    @MessagePattern(AuthServiceController.RegisterWithEmailMessagePattern)
    registerWithEmail(registerUserDto: AuthServiceController.RegisterWithEmailRequest) {
        return this.authService.register(registerUserDto);
    }

    @MessagePattern(AuthServiceController.RefreshTokensMessagePattern)
    refreshToken(refreshToken: string) {
        return this.authService.refreshTokens(refreshToken);
    }
}
