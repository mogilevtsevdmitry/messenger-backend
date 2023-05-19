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
    export type Request = {
        /** Идентификатор пользователя */
        id: string;
    };

    /** #### Описание ответа
     *
     */
    export type Response = User;
}
