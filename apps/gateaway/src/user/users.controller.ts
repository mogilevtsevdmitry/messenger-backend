import {
    DeleteUserMethod,
    FindUserByEmail,
    FindUserMethod,
    FindUsersMethod,
    UpdateUserMethod,
} from '@contracts/controllers/user';
import { USER_SERVICE } from '@contracts/services/user';
import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    NotFoundException,
    Param,
    ParseUUIDPipe,
    Put,
    Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { handleTimeoutAndErrors } from '@shared/helpers';
import { ParseEmailPipe, QueryDto, QueryPipe } from '@shared/pipes';
import { map } from 'rxjs';
import { UserResponse } from './responses';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(@Inject(USER_SERVICE) private client: ClientProxy) {}

    @ApiOperation({
        summary: FindUsersMethod.summary,
        description: FindUsersMethod.description,
    })
    @ApiOkResponse({ type: [UserResponse] })
    @Get(FindUsersMethod.path)
    async findAll(@Query(QueryPipe) opts?: QueryDto) {
        return this.client.send({ cmd: 'find-users' }, opts);
    }

    @ApiOperation({
        summary: FindUserMethod.summary,
        description: FindUserMethod.description,
    })
    @ApiOkResponse({ type: UserResponse })
    @Get(FindUserMethod.path)
    async findOne(@Param('userId', ParseUUIDPipe) userId: string) {
        return this.client.send({ cmd: 'find-user' }, userId);
    }

    @ApiOperation({
        summary: FindUserByEmail.summary,
        description: FindUserByEmail.description,
    })
    @ApiOkResponse({ type: UserResponse })
    @Get(FindUserByEmail.path)
    async findByEmail(@Param('email', ParseEmailPipe) email: string) {
        return this.client.send({ cmd: 'find-by-email' }, email);
    }

    @ApiOperation({
        summary: UpdateUserMethod.summary,
        description: UpdateUserMethod.description,
    })
    @ApiOkResponse({ type: UserResponse })
    @Put(UpdateUserMethod.path)
    async updateOne(@Param('userId', ParseUUIDPipe) userId: string, @Body() dto: Exclude<UserResponse, 'id'>) {
        return this.client.send({ cmd: 'update-user' }, { userId, dto }).pipe(
            map((user) => {
                if (!user) {
                    throw new NotFoundException(`Пользователь с ID ${userId} не найден`);
                }
                return new UserResponse(user);
            }),
            handleTimeoutAndErrors(),
        );
    }

    @ApiOperation({
        summary: DeleteUserMethod.summary,
        description: DeleteUserMethod.description,
    })
    @ApiOkResponse({ type: UserResponse })
    @Delete(DeleteUserMethod.path)
    async deleteOne(@Param('userId', ParseUUIDPipe) userId: string) {
        return this.client.send({ cmd: 'delete-user' }, userId);
    }
}
