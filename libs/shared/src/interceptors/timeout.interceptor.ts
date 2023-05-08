import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    RequestTimeoutException,
    Logger,
    BadRequestException,
} from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            timeout(5000),
            catchError((err) => {
                Logger.error(err, TimeoutInterceptor.name);
                if (err instanceof TimeoutError) {
                    return throwError(() => new RequestTimeoutException());
                }
                throw new BadRequestException(err);
            }),
        );
    }
}
