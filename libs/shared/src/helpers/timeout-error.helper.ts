import { BadRequestException, RequestTimeoutException } from '@nestjs/common';
import { Observable, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

export function handleTimeoutAndErrors<T = unknown>() {
    return (source$: Observable<T>) =>
        source$.pipe(
            timeout(5000),
            catchError((err) => {
                if (err instanceof TimeoutError) {
                    throw new RequestTimeoutException();
                }
                throw new BadRequestException(err);
            }),
        );
}
