import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
    const config = new ConfigService();
    const port = config.get<number>('AUTH_API_PORT', 5001);
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
        transport: Transport.TCP,
        options: {
            port,
        },
    });
    await app.listen().then(() => {
        Logger.log(`AuthMicroservice started on "${port}"`, 'AUTH');
    });
}
bootstrap();
