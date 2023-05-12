import { NOTIFICATION_SERVICE } from '@contracts/services/notification';
import { ConfigService } from '@nestjs/config';
import { ClientProvider, ClientsModuleAsyncOptions, Transport } from '@nestjs/microservices';

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
