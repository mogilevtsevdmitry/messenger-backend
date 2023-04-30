import { AuthModule } from '@auth-app/auth.module';
import { Module } from '@nestjs/common';
import { SharedModule } from '@shared';
import { AuthModule as MainAuthModule } from './auth/auth.module';

@Module({
    imports: [SharedModule, MainAuthModule, AuthModule],
})
export class AppModule {}
