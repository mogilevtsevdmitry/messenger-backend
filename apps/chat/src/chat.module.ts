import { AuthModule } from '@auth-app/auth.module';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { SharedModule } from '@shared';
import { JwtGuard, RolesGuard } from '@shared/guards';
import { ChatGateway } from './chat.gateway';
import { ServicesModule } from './services/services.module';

@Module({
    imports: [SharedModule, ServicesModule, AuthModule],
    providers: [
        ChatGateway,
        {
            provide: APP_GUARD,
            useClass: JwtGuard,
        },
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
})
export class ChatModule {}
