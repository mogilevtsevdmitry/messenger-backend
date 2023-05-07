import { Controller, Get, Query, Inject, Patch, Delete, Body, Param, Res } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { QueryPipe } from '@shared/pipes';
import { QueryDto } from '@shared/pipes/dto/query-pipe.dto';

@Controller('users')
export class UserController {
    constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

    @Get()
    async findAll(@Query(QueryPipe) opts?: QueryDto) {
        return this.client.send({ cmd: 'find-users' }, opts);
    }

    @Get(':userId')
    async findOne(@Param('userId') userId: string) {
        return this.client.send({ cmd: 'find-user' }, userId);
    }

    @Get('email/:email')
    async findByEmail(@Param('email') email: string) {
        return this.client.send({ cmd: 'find-by-email' }, email);
    }

    @Patch(':userId')
    async updateOne(@Param('userId') userId: string, @Body() dto: any) {
        return this.client.send({ cmd: 'update-user' }, { userId, dto });
    }

    @Delete(':userId')
    async deleteOne(@Param('userId') userId: string) {
        return this.client.send({ cmd: 'delete-user' }, userId);
    }
}
