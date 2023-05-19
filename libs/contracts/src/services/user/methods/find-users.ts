import { User } from '@shared/interfaces';
import { IQueryPipe } from '@shared/pipes';

export namespace FindUsersNamespace {
    /** #### Команда авторизации
     *
     * Передается в @MessagePattern
     */
    export const MessagePattern = {
        cmd: 'find-users',
    };

    /** #### Описание входящих данных
     *
     */
    export type Request = IQueryPipe;

    /** #### Описание ответа
     *
     */
    export type Response = {
        limit: number;
        offset: number;
        total: number;
        rows: User[];
    };
}
