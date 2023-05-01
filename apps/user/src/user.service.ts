import { Injectable } from '@nestjs/common';
import { PrismaService } from '@providers/prisma/prisma.service';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async findUserByEmail(findUserByEmailDto: any) {
        return this.prisma.user.findFirst({ where: { email: findUserByEmailDto.email } });
    }

    async createUser(createUserDto: { email: string; password: string }) {
        const salt = await genSalt(10);
        const hashedPassword = await hash(createUserDto.password, salt);
        const user = await this.prisma.user.upsert({
            create: {
                email: createUserDto.email,
                password: hashedPassword,
            },
            where: {
                email: createUserDto.email,
            },
            update: {},
        });
        return user;
    }
}
