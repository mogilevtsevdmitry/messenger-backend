import { ResponseMany, IResponseMany } from './response-many';

export class Response {
    static returnOne<T>(response: Partial<T>): T {
        return response as T;
    }

    static returnMany<T>(response: IResponseMany<Partial<T>>): ResponseMany<T> {
        return new ResponseMany<T>(response as any);
    }
}
