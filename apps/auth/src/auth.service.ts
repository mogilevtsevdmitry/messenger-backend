import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, map, of } from 'rxjs';

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
        if (this.config.get('NODE_ENV') !== 'production') {
            return of(testUser);
        }
        return this.client.send({ cmd: 'get-user-by-id' }, { userId }).pipe(
            map((user) => {
                if (!user) {
                    return null;
                }
                return {
                    userId: user.id,
                    email: user.email,
                    roles: user.roles,
                };
            }),
            catchError((err) => {
                this.logger.error(err);
                return of(null);
            }),
        );
    }
}
