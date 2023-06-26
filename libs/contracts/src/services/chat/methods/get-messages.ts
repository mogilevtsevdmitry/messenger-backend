import { Message } from '@prisma/client';

export namespace GetMessagesNamespace {
    export const MessagePattern = {
        cmd: 'get-messages',
    };

    export interface Request {
        limit: number;
        offset: number;
        sort?: string;
        [k: string]: unknown;
    }

    export type Response = {
        total: number;
        rows: Message[];
    };
}
