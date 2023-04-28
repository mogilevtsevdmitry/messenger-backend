import { Controller, Logger, OnModuleInit } from '@nestjs/common';
import { MessagePattern, Payload, Transport } from '@nestjs/microservices';

@Controller()
export class LoginController implements OnModuleInit {
    private readonly logger = new Logger(LoginController.name);

    onModuleInit(): void {
        this.logger.log('Auth microservice started');
    }

    @MessagePattern({ cmd: 'login' }, Transport.TCP)
    login(@Payload() data: any) {
        console.log('auth local', data);
        return {
            token: 1,
        };
    }
}
