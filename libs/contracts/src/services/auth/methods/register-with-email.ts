import { User } from '@shared/interfaces';

export namespace RegisterWithEmailNamespace {
    /** #### Команда авторизации
     *
     * Передается в @MessagePattern
     */
    export const MessagePattern = {
        cmd: 'register-with-email',
    };

    /** #### Описание входящих данных
     *
     */
    export interface Request {
        /** Email пользователя */
        email: string;
        /** Пароль пользователя */
        password: string;
        /** Повторно пароль пользователя */
        confirmPassword: string;
    }

    /** #### Описание ответа
     *
     */
    export type Response = User;
}
