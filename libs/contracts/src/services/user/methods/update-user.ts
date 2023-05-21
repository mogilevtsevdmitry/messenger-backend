import { User } from '@shared/interfaces';

export namespace UpdateUserNamespace {
    /** #### Команда авторизации
     *
     * Передается в @MessagePattern
     */
    export const MessagePattern = {
        cmd: 'update-user',
    };

    /** #### Описание входящих данных
     *
     */
    export type Request = Omit<User, 'token'>;

    /** #### Описание ответа
     *
     */
    export type Response = User;
}
