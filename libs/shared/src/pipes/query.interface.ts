import { IncludeDto, PaginationDto, WhereDto } from './dto';

export interface IQueryPipe {
    pagination: PaginationDto;
    where: WhereDto;
    include: IncludeDto;
}
