import { compareSync } from 'bcrypt';

export class AuthHelper {
    static compare(password: string, hashedPassword: string): boolean {
        return compareSync(password, hashedPassword);
    }
}
