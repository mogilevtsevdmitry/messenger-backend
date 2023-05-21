import validator from 'validator';
import { FindUserNamespace } from '@contracts/services/user';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserValidation {
    validateUserIdOrEmail({ id, email }: FindUserNamespace.Request): FindUserNamespace.Request {
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
