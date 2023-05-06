import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthServiceController, LoginEmail, RegisterEmail } from '@webmogilevtsev/messenger-api-dto';
import { AuthService } from './services/auth.service';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @MessagePattern(AuthServiceController.LoginEmailMessagePattern)
    login(loginUserDto: LoginEmail.RequestBody) {
        return this.authService.login(loginUserDto);
    }

    @MessagePattern(AuthServiceController.RegisterEmailMessagePattern)
    regiaterEmail(registerUserDto: RegisterEmail.RequestBody) {
        return this.authService.register(registerUserDto);
    }
}
