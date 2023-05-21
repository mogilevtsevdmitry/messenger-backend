import validator from 'validator';
import { FindUserNamespace } from '@contracts/services/user';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserValidation {
    userIdOrEmailToObject({ id, email }: FindUserNamespace.Request): FindUserNamespace.Request {
        console.log(id, email);
        if (id) {
            const isUuid = validator.isUUID(id);
            return { id: isUuid ? id : undefined };
        }
        if (email) {
            const isEmail = validator.isEmail(email);
            return { email: isEmail ? email : undefined };
        }
    }
}
