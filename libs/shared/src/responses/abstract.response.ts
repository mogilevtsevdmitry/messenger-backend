import { BadRequestException, HttpExceptionOptions } from '@nestjs/common';
import { ResponseMany, IResponseMany } from './response-many';

export class Response {
    static returnOne<T>(response: Partial<T>): T {
        return response as T;
    }

    static returnMany<T>(response: IResponseMany<Partial<T>>): ResponseMany<T> {
        return new ResponseMany<T>(response as any);
    }

    static returnBadRequest(message: string, options?: HttpExceptionOptions) {
        return new BadRequestException(message, options);
    }
}
