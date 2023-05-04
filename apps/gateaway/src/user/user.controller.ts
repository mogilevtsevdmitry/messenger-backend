import { Controller, Get, Query, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { QueryPipe } from '@shared/pipes';
import { QueryDto } from '@shared/pipes/dto/query-pipe.dto';

@Controller('users')
export class UserController {
    constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

    @Get()
    async findAll(@Query(QueryPipe) opts?: QueryDto) {
        console.log(`in controller`, opts);
        return this.client.send({ cmd: 'find-all-users' }, opts);
    }
}
