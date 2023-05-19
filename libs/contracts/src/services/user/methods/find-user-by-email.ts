import { User } from '@shared/interfaces';

export namespace FindUserByEmailNamespace {
    /** #### Команда авторизации
     *
     * Передается в @MessagePattern
     */
    export const MessagePattern = {
        cmd: 'find-user-by-email',
    };

    /** #### Описание входящих данных
     *
     */
    export type Request = {
        email: string;
    };

    /** #### Описание ответа
     *
     */
    export type Response = User;
}
