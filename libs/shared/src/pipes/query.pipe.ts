import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { IncludeDto, PaginationDto, WhereTokenDto, WhereUserDto } from './dto';
import { IQueryPipe } from './query.interface';

export type TGroups = 'pagination' | 'where' | 'include' | 'user' | 'token';

@Injectable()
export class QueryPipe implements PipeTransform<IQueryPipe, IQueryPipe> {
    transform(values: any, metadata: ArgumentMetadata) {
        const options = (group: TGroups) => ({
            groups: [group],
            excludeExtraneousValues: true,
            exposeDefaultValues: true,
        });

        return {
            pagination: plainToClass(PaginationDto, values, { ...options('pagination') }),
            where: {
                token: plainToClass(WhereTokenDto, values, { ...options('token') }),
                user: plainToClass(WhereUserDto, values, { ...options('user') }),
            },
            include: plainToClass(IncludeDto, values, { ...options('include') }),
        } as IQueryPipe;
    }
}
