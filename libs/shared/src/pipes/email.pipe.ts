import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { isEmail } from 'class-validator';

@Injectable()
export class ParseEmailPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (!isEmail(value)) throw new BadRequestException(`This is not email`);
        return value;
    }
}
