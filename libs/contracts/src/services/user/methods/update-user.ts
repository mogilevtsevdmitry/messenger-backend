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
    export type Request = Pick<User, 'id'> & Partial<Omit<User, 'id'>>;

    /** #### Описание ответа
     *
     */
    export type Response = User;
}
