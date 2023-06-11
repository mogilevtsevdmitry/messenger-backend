import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface UserPayload {
    userId: string;
    email: string;
    roles: string[];
}

export const CurrentUser = createParamDecorator(
    (data: keyof UserPayload, ctx: ExecutionContext): UserPayload | Partial<UserPayload> => {
        const request = ctx.switchToHttp().getRequest();
        return data ? request.user[data] : request.user;
    },
);
