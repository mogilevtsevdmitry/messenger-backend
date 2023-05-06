import { Injectable } from '@nestjs/common';
import { PrismaService } from '@providers/prisma/prisma.service';
import { QueryDto } from '@shared/pipes/dto/query-pipe.dto';
import { LoginUserDto } from 'apps/gateaway/src/auth/dto';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: { email: string; password: string }) {
        const hashedPassword = await hash(data.password, await genSalt(10));

        return await this.prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
            },
        });
    }

    async findAll(opts?: QueryDto) {
        const total = await this.prisma.user.aggregate({ _count: { id: true } });

        return await this.prisma.user
            .findMany({
                skip: opts.options.skip,
                take: opts.options.take,
                where: {
                    email: opts.where.email,
                    id: opts.where.id,
                    nickname: opts.where.nickname,
                    lastName: opts.where.lastName,
                    firstName: opts.where.firstName,
                },
                include: {
                    Token: opts.include.token,
                },
            })
            .then((users) => {
                return {
                    total: total._count.id,
                    raw: users,
                };
            });
    }

    async findOne(userId: string) {
        return await this.prisma.user.findUnique({ where: { id: userId } });
    }

    async findByEmail(email: string) {
        return await this.prisma.user.findFirst({ where: { email } });
    }

    async updateOne(userId: string, data: any) {
        return await this.prisma.user.update({ data, where: { id: userId } });
    }

    async deleteOne(userId: string) {
        return await this.prisma.user.delete({ where: { id: userId } });
    }
}
