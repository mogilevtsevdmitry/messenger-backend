import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = app.get(ConfigService);
    const port = config.get('API_PORT', 5000);
    await app.listen(port, () => {
        Logger.log(`Main app started on "${port}" port`, 'Main');
    });
}
bootstrap();
