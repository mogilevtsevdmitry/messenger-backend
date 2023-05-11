import { WhereTokenDto } from './where-token.dto';
import { WhereUserDto } from './where-user.dto';

export class WhereDto {
    user? = new WhereUserDto();
    token? = new WhereTokenDto();

    is = (key: string) => ['user', 'token'].includes(key);
}
