import { Injectable } from '@nestjs/common';
import { PrismaService } from '@providers/prisma/prisma.service';
import { QueryDto } from '@shared/pipes/dto/query-pipe.dto';
import { LoginUserDto } from 'apps/gateaway/src/auth/dto';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async findUserByEmail(findUserByEmailDto: Pick<LoginUserDto, 'email'>) {
        return this.prisma.user.findFirst({
            where: { email: findUserByEmailDto.email },
        });
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

    async findAll(opts?: QueryDto) {
        console.log(opts);
        return await this.prisma.user.findMany({
            // take: opts.take.get('user'),
            // include: {
            //     // Token: opts.include.token,
            // },
        });
    }
}
