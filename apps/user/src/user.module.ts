import { Module } from '@nestjs/common';
import { ProvidersModule } from '@providers';
import { SharedModule } from '@shared';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        ProvidersModule,
        SharedModule,
        ClientsModule.register([
            {
                name: 'AUTH_SERVICE',
                transport: Transport.TCP,
                options: {
                    host: 'localhost',
                    port: 5003,
                },
            },
        ]),
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
