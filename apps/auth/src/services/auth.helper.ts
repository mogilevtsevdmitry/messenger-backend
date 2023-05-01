import { compare, genSaltSync, hashSync } from 'bcrypt';

export class AuthHelper {
    static async hash(password: string): Promise<string> {
        const salt = genSaltSync(10);
        return hashSync(password, salt);
    }

    static async compare(password: string, hashedPassword: string): Promise<boolean> {
        return await compare(password, hashedPassword);
    }
}
