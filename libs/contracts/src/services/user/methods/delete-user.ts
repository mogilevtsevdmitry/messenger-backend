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
    export type Request = User;

    /** #### Описание ответа
     *
     */
    export type Response = User;
}
