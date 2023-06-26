import { Module } from '@nestjs/common';
import { SharedModule } from '@shared';
import { ChatController } from './chat.controller';
import { ServicesModule } from './services/services.module';

@Module({
    imports: [SharedModule, ServicesModule],
    providers: [
        // {
        //     provide: APP_GUARD,
        //     useClass: JwtGuard,
        // },
        // {
        //     provide: APP_GUARD,
        //     useClass: RolesGuard,
        // },
    ],
    controllers: [ChatController],
})
export class ChatModule {}
