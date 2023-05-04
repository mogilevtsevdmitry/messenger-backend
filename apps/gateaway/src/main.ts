import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'body-parser';
import * as compression from 'compression';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });
    app.use(json({ limit: '100mb' }));
    app.use(compression());

    /** Config Service */
    const config = app.get(ConfigService);

    /** Main Api Port */
    const port = config.get<number>('API_PORT', 5000);

    // Swagger
    const swaggerConfig = new DocumentBuilder()
        .addBearerAuth()
        .setTitle('Noname Messenger')
        .setDescription('## API простого мессенджера')
        .setVersion('1.0')
        .addServer(`http://localhost:${port}/api/`, 'local server')
        .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api-doc', app, document);

    /** Global prefix */
    app.setGlobalPrefix('api');

    /** Global validation */
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(port, () => {
        Logger.log(`Main app started on "${port}" port`, 'MAIN');
        Logger.log(`Swagger documentation on http://localhost:${port}/api-doc`, 'SWAGGER');
    });
}
bootstrap();
