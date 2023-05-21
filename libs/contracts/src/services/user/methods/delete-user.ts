import { BadRequestException, NotFoundException } from '@nestjs/common/exceptions';
import { User } from '@shared/interfaces';

export namespace DeleteUserNamespace {
    /** #### Команда авторизации
     *
     * Передается в @MessagePattern
     */
    export const MessagePattern = {
        cmd: 'delete-user',
    };

    /** #### Описание входящих данных
     *
     */
    export type Request = Pick<User, 'id'>;

    /** #### Описание ответа
     *
     */
    export type Response = User | BadRequestException | NotFoundException;
}
