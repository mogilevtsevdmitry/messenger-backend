import { NOTIFICATION_SERVICE } from '@contracts/services/notification';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProvider, ClientsModuleAsyncOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const notificationClientProvider = (config: ConfigService): ClientProvider => {
    return {
        transport: Transport.TCP,
        options: {
            host: config.get('NOTIFICATION_SERVICE_HOST', 'localhost'),
            port: +config.get('NOTIFICATION_API_PORT', 5003),
        },
    };
};

export const notificationClientFactory = (): ClientsModuleAsyncOptions => {
    return [
        {
            name: NOTIFICATION_SERVICE,
            inject: [ConfigService],
            useFactory: (config: ConfigService) => notificationClientProvider(config),
        },
    ];
};

export const getEmailConfig = async (config: ConfigService) => {
    const transport = config.get<string>('NOTIFICATION_SERVICE_EMAIL_TRANSPORT');
    const name = config.get<string>('NOTIFICATION_SERVICE_EMAIL_FROM_NAME');
    const address = transport.split(':')[1].split('//')[1];

    return {
        transport,
        defaults: {
            from: `"${name}" <${address}>`,
        },
        template: {
            dir: 'apps/notification/src/templates/**',
            adapter: new HandlebarsAdapter(),
            options: {
                strict: false,
            },
        },
    };
};
