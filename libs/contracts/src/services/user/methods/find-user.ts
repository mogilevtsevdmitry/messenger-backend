import { BadRequestException, NotFoundException } from '@nestjs/common/exceptions';
import { User } from '@shared/interfaces';

export namespace FindUserNamespace {
    /** #### Команда авторизации
     *
     * Передается в @MessagePattern
     */
    export const MessagePattern = {
        cmd: 'find-user',
    };

    /** #### Описание входящих данных
     *
     */
    export type Request = { userId?: string; email?: string };

    /** #### Описание ответа
     *
     */
    export type Response = User | BadRequestException | NotFoundException;
}
