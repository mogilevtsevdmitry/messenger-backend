import { ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions, JwtModuleOptions } from '@nestjs/jwt';

const jwtModuleOptions = (config: ConfigService): JwtModuleOptions => {
    return {
        secret: config.get('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: {
            expiresIn: config.get('JWT_ACCESS_EXPIRES_IN', '5m'),
        },
    };
};

export const jwtModuleAsyncOptions = (): JwtModuleAsyncOptions => ({
    inject: [ConfigService],
    useFactory: (config: ConfigService) => jwtModuleOptions(config),
});
