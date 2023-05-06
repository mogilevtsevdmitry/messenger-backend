import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth.module';

async function bootstrap() {
    const config = new ConfigService();
    const port = config.get<number>('AUTH_API_PORT', 5001);
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
        transport: Transport.TCP,
        options: {
            port: +port,
            host: 'localhost',
        },
    });
    await app.listen().then(() => {
        Logger.log(`AuthMicroservice started on "${port}"`, 'AUTH');
    });
}
bootstrap();
