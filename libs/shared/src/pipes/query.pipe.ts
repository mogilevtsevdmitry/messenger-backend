import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { QueryDto } from './dto/query-pipe.dto';

@Injectable()
export class QueryPipe implements PipeTransform {
    transform(queries: object, metadata: ArgumentMetadata) {
        const dto = new QueryDto(queries);

        return dto;
    }
}
