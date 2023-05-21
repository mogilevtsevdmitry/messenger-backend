import { BadRequestException, NotFoundException } from '@nestjs/common/exceptions';
import { User } from '@shared/interfaces';

export namespace FindUsersNamespace {
    /** #### Команда авторизации
     *
     * Передается в @MessagePattern
     */
    export const MessagePattern = {
        cmd: 'find-users',
    };

    /** #### Описание входящих данных
     *
     */
    export type Request = User;

    /** #### Описание ответа
     *
     */
    export type Response = User | BadRequestException | NotFoundException;
}
