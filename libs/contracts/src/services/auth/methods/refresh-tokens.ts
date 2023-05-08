import { RefreshToken } from '@shared/interfaces';

export namespace RefreshTokensNamespace {
    /** #### Команда авторизации
     *
     * Передается в @MessagePattern
     */
    export const MessagePattern = {
        cmd: 'refresh-tokens',
    };

    /** #### Описание входящих данных
     *
     */
    export interface Request {
        /** Refresh token */
        refreshToken: string;
    }

    /** #### Описание ответа
     *
     */
    export type Response = {
        /** Access Token */
        accessToken: string;
        /** Refresh Token */
        refreshToken: RefreshToken;
    };
}
