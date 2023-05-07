import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { SharedModule } from '@shared';
import { JwtGuard, RolesGuard } from '@shared/guards';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [SharedModule, AuthModule, UserModule],
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
})
export class AppModule {}
