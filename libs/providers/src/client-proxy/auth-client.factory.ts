import { ConfigService } from '@nestjs/config';
import { ClientProvider, ClientsModuleAsyncOptions, Transport } from '@nestjs/microservices';
import { AuthServiceContract } from '@webmogilevtsev/messenger-api-dto';

const authClientProvider = (config: ConfigService): ClientProvider => {
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
            name: AuthServiceContract.name,
            inject: [ConfigService],
            useFactory: (config: ConfigService) => authClientProvider(config),
        },
    ];
};
