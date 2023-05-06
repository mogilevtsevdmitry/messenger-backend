import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { userClientProvider } from '@providers';
import { UserModule } from './user.module';

async function bootstrap() {
    const config = new ConfigService();
    const port = config.get<number>('USER_API_PORT', 5002);
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(UserModule, userClientProvider(config));
    await app.listen().then(() => {
        Logger.log(`UserMicroservice started on "${port}"`, 'USER_SERVICE');
    });
}
bootstrap();
