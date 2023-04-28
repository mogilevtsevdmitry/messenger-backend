import { Module } from '@nestjs/common';
import { LocalModule } from './local/local.module';

@Module({
    imports: [LocalModule],
})
export class AuthModule {}
