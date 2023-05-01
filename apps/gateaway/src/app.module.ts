import { Module } from '@nestjs/common';
import { SharedModule } from '@shared';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [SharedModule, AuthModule],
})
export class AppModule {}
