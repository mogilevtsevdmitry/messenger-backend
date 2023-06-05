import { RefreshToken } from '@shared/interfaces';

export namespace LoginWithEmailNamespace {
    /** #### Команда авторизации
     *
     * Передается в @MessagePattern
     */
    export const MessagePattern = {
        cmd: 'login-with-email',
    };

    /** #### Описание входящих данных
     *
     */
    export interface Request {
        /** Email пользователя */
        email: string;
        /** Пароль пользователя */
        password: string;
    }

    /** #### Описание ответа
     *
     */
    export interface Response {
        /** Access Token */
        accessToken: string;
        /** Refresh Token */
        refreshToken: RefreshToken;
    }
}
