import { Expose } from 'class-transformer';
import { WhereTokenDto } from './where-token.dto';
import { WhereUserDto } from './where-user.dto';

export class WhereDto {
    @Expose({ groups: ['where'] })
    user: WhereUserDto;

    @Expose({ groups: ['where'] })
    token: WhereTokenDto;
}
