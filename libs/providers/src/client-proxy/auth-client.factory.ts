import { AuthClient } from '@contracts/services/auth';
import { ConfigService } from '@nestjs/config';
import { ClientProvider, ClientsModuleAsyncOptions, Transport } from '@nestjs/microservices';

export const authClientProvider = (config: ConfigService): ClientProvider => {
    return {
        transport: Transport.TCP,
        options: {
            host: config.get('AUTH_SERVICE_HOST', 'localhost'),
            port: +config.get('AUTH_API_PORT', 5001),
        },
    };
};

export const authClientFactory = (): ClientsModuleAsyncOptions => {
    return [
        {
            name: AuthClient.Name,
            inject: [ConfigService],
            useFactory: (config: ConfigService) => authClientProvider(config),
        },
    ];
};
