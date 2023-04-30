import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { validate } from './cases';

const testUser = {
    userId: '4a9f7816-e6bb-11ed-a05b-0242ac120003',
    email: 'test@mail.ru',
    roles: ['USER'],
};

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);
    constructor(@Inject('USER_SERVICE') private client: ClientProxy, private readonly config: ConfigService) {}

    validate(userId: string) {
        return validate(userId, this.config, this.client, testUser);
    }

    login() {}

    register() {}

    refreshTokens() {}
}
