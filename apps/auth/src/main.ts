import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { authClientProvider } from '@providers';
import { AuthModule } from './auth.module';

async function bootstrap() {
    const config = new ConfigService();
    const port = config.get<number>('AUTH_API_PORT', 5001);
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, authClientProvider(config));
    await app.listen().then(() => {
        Logger.log(`AuthMicroservice started on "${port}"`, 'AUTH_SERVICE');
    });
}
bootstrap();
