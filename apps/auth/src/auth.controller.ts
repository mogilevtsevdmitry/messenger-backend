import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthServiceController } from '@webmogilevtsev/messenger-api-dto';
import { AuthService } from './services/auth.service';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @MessagePattern(AuthServiceController.LoginWithEmailMessagePattern)
    loginWithEmail(loginUserDto: AuthServiceController.LoginWithEmailRequest) {
        return this.authService.login(loginUserDto);
    }

    @MessagePattern(AuthServiceController.RegisterWithEmailMessagePattern)
    registerWithEmail(registerUserDto: AuthServiceController.RegisterWithEmailRequest) {
        return this.authService.register(registerUserDto);
    }

    @MessagePattern(AuthServiceController.RefreshTokensMessagePattern)
    refreshToken(userId: string) {
        return this.authService.refreshTokens(userId);
    }
}
