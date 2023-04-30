import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
    constructor(@Inject('AUTH_SERVICE') private client: ClientProxy) {}

    @Post('local/login')
    async localLogin(@Body() data) {
        console.log('local/login', data);

        return this.client.send({ cmd: 'login' }, data);
    }
}
