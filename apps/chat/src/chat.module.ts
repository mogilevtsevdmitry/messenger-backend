import { AuthModule } from '@auth-app/auth.module';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { SharedModule } from '@shared';
import { JwtGuard, RolesGuard } from '@shared/guards';
import { ServicesModule } from './services/services.module';
import { ChatController } from './chat.controller';

@Module({
    imports: [SharedModule, ServicesModule, AuthModule],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtGuard,
        },
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
    controllers: [ChatController],
})
export class ChatModule {}
