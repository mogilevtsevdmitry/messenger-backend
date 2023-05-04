<<<<<<< HEAD
import { Module } from '@nestjs/common'
import { SharedModule } from '@shared'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'

@Module({
	imports: [SharedModule, AuthModule, UserModule],
=======
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { SharedModule } from '@shared';
import { JwtGuard, RolesGuard } from '@shared/guards';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [SharedModule, AuthModule],
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
>>>>>>> master
})
export class AppModule {}
