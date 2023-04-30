import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    /** Global prefix */
    app.setGlobalPrefix('api');

    /** Config Service */
    const config = app.get(ConfigService);

    /** Main Api Port */
    const port = config.get<number>('API_PORT', 5000);

    await app.listen(port, () => {
        Logger.log(`Main app started on "${port}" port`, 'Main');
    });
}
bootstrap();
