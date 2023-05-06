import { ConfigService } from '@nestjs/config';
import { ClientProvider, ClientsModuleAsyncOptions, Transport } from '@nestjs/microservices';

const userClientProvider = (config: ConfigService): ClientProvider => {
    return {
        transport: Transport.TCP,
        options: {
            host: config.get('USER_SERVICE_HOST', 'localhost'),
            port: +config.get('USER_API_PORT', 5002),
        },
    };
};

export const userClientFactory = (): ClientsModuleAsyncOptions => {
    return [
        {
            name: 'USER_SERVICE',
            inject: [ConfigService],
            useFactory: (config: ConfigService) => userClientProvider(config),
        },
    ];
};
