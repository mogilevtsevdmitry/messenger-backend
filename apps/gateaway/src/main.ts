import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

const allowedHeaders = [
    'Accept',
    'Authorization',
    'Content-Type',
    'X-Requested-With',
    'Origin',
    'User-Agent',
    'Referer',
    'Sec-Fetch-Mode',
    'Sec-Fetch-Site',
    'Sec-Fetch-Dest',
    'Accept-Encoding',
    'Accept-Language',
    'Access-Control-Request-Headers',
    'Access-Control-Request-Method',
    'Connection',
    'Host',
];

const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD', 'CONNECT', 'TRACE'];

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    /** Config Service */
    const config = app.get(ConfigService);
    app.useLogger(['error', 'log', 'verbose']);
    const origin = config.get<string>('ALLOW_ORIGINS').split(',');
    Logger.verbose({ origin }, 'bootstrap');

    app.enableCors({
        credentials: true,
        origin,
        allowedHeaders,
        methods,
    });

    app.use(json({ limit: '100mb' }));
    app.use(compression());
    app.use(cookieParser());

    /** Main Api Port */
    const port = config.get<number>('API_PORT', 5000);

    Logger.verbose({ NODE_ENV: config.get('NODE_ENV') }, 'bootstrap');

    /** Global prefix */
    app.setGlobalPrefix('api');

    /** Global validation */
    app.useGlobalPipes(new ValidationPipe());

    // Swagger
    const swaggerConfig = new DocumentBuilder()
        .addBearerAuth()
        .setTitle('Noname Messenger')
        .setDescription('## API простого мессенджера')
        .setVersion('1.0')
        .addServer(`http://95.163.240.197/api/`, 'DEV server')
        .addServer(`http://localhost:${port}/`, 'local server')
        .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api-doc', app, document);

    await app.listen(port, () => {
        Logger.log(`Main app started on "${port}" port`, 'MAIN');
        Logger.log(`Swagger documentation on http://localhost:${port}/api-doc`, 'SWAGGER');
    });
}
bootstrap();
