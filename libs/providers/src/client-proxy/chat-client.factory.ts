import { CHAT_SERVICE } from '@contracts/services/chat';
import { ConfigService } from '@nestjs/config';
import { ClientProvider, ClientsModuleAsyncOptions, Transport } from '@nestjs/microservices';

export const chatClientProvider = (config: ConfigService): ClientProvider => {
    return {
        transport: Transport.TCP,
        options: {
            host: config.get('CHAT_SERVICE_HOST', 'localhost'),
            port: +config.get('CHAT_API_PORT', 5004),
        },
    };
};

export const chatClientFactory = (): ClientsModuleAsyncOptions => {
    return [
        {
            name: CHAT_SERVICE,
            inject: [ConfigService],
            useFactory: (config: ConfigService) => chatClientProvider(config),
        },
    ];
};
