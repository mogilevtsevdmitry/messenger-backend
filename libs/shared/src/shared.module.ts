import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionFilter } from './filters';

@Global()
@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true })],
    providers: [
        {
            provide: APP_FILTER,
            useClass: ExceptionFilter,
        },
    ],
})
export class SharedModule {}
