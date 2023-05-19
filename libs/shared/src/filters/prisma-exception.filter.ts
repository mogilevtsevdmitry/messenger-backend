import { throwError } from 'rxjs';
import { Catch, ArgumentsHost, BadGatewayException, ExceptionFilter, ConflictException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
    // eslint-disable @typescript-eslint/no-unused-vars
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
        const { message } = exception;

        const findText = (target: string) => {
            const matched = message.indexOf(target);
            const sliced = message.slice(matched);
            return matched === -1 ? 'Internal Server Error' : sliced;
        };

        const UNIQUE = findText(`Unique constraint`);

        if (UNIQUE) {
            return throwError(() => new ConflictException(UNIQUE).getResponse());
        }

        throw new BadGatewayException(`Internal Server Error`);
    }
}
