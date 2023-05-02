import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'IsPasswordsMatching', async: false })
export class IsPasswordsMatchingConstraint implements ValidatorConstraintInterface {
    validate(confirmPassword: string, args: ValidationArguments) {
        const object = args.object as any;
        return object.password === confirmPassword;
    }

    defaultMessage(args: ValidationArguments) {
        return 'Password mismatch';
    }
}
