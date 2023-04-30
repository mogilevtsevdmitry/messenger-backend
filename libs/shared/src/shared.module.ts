import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard, RolesGuard } from './guards';

@Global()
@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true })],
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
export class SharedModule {}
