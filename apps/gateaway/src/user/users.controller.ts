import {
    DeleteUserMethod,
    FindUserByEmail,
    FindUserMethod,
    FindUsersMethod,
    UpdateUserMethod,
} from '@contracts/controllers/user';
import { RegisterWithEmailNamespace } from '@contracts/services/auth';
import {
    DeleteUserNamespace,
    FindUserNamespace,
    FindUsersNamespace,
    UpdateUserNamespace,
    USER_SERVICE,
} from '@contracts/services/user';
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
import { ApiTags, ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { handleTimeoutAndErrors } from '@shared/helpers';
import { QueryPipe, IQueryPipe, PaginationDto } from '@shared/pipes';
import { map, Observable } from 'rxjs';
import { UserResponse } from './responses';
import { ResponseMany } from '@shared/responses';
import { User } from '@shared/interfaces';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(@Inject(USER_SERVICE) private client: ClientProxy) {}

    @ApiOperation({
        summary: FindUsersMethod.summary,
        description: FindUsersMethod.description,
    })
    @ApiOkResponse({ type: ResponseMany<User> })
    @ApiQuery({ type: PaginationDto })
    @Get(FindUsersMethod.path)
    async findAll(@Query(QueryPipe) opts?: IQueryPipe): Promise<Observable<ResponseMany<FindUsersNamespace.Response>>> {
        return this.client.send<ResponseMany<FindUsersNamespace.Response>, IQueryPipe>(
            FindUsersNamespace.MessagePattern,
            opts,
        );
    }

    @ApiOperation({
        summary: FindUserMethod.summary,
        description: FindUserMethod.description,
    })
    @ApiOkResponse({ type: UserResponse })
    @Get(FindUserMethod.path)
    findOne(@Param('userOrEmail') userIdOrEmail: string): Observable<any> {
        return this.client.send<FindUserNamespace.Response, string>(FindUserNamespace.MessagePattern, userIdOrEmail);
    }

    @ApiOperation({
        summary: UpdateUserMethod.summary,
        description: UpdateUserMethod.description,
    })
    @ApiOkResponse({ type: UserResponse })
    @Put(UpdateUserMethod.path)
    updateOne(
        @Param('userId', ParseUUIDPipe) userId: string,
        @Body() dto: UpdateUserNamespace.Request,
    ): Observable<any> {
        return this.client.send(UpdateUserNamespace.MessagePattern, { userId, dto }).pipe(
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
    deleteOne(@Param('userId', ParseUUIDPipe) userId: string) {
        return this.client.send(DeleteUserNamespace.MessagePattern, userId);
    }
}
