import { compareSync, genSaltSync, hashSync } from 'bcrypt';

export class AuthHelper {
    static hash(password: string): string {
        const salt = genSaltSync(10);
        return hashSync(password, salt);
    }

    static compare(password: string, hashedPassword: string): boolean {
        return compareSync(password, hashedPassword);
    }
}
