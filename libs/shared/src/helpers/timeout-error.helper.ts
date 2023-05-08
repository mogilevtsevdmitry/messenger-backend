import { catchError, timeout } from 'rxjs/operators';
import { Observable, TimeoutError, throwError } from 'rxjs';
import { RequestTimeoutException, BadRequestException } from '@nestjs/common';

export function handleTimeoutAndErrors<T = unknown>() {
    return (source$: Observable<T>) =>
        source$.pipe(
            timeout(5000),
            catchError((err) => {
                if (err instanceof TimeoutError) {
                    return throwError(() => new RequestTimeoutException());
                }
                throw new BadRequestException(err);
            }),
        );
}
