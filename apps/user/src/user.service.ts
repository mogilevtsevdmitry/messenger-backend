import { Injectable } from '@nestjs/common';
import { PrismaService } from '@providers/prisma/prisma.service';
import { User } from '@shared/interfaces';
import { QueryDto } from '@shared/pipes';
import { Response } from '@shared/responses';
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
                nickname: '',
                lastName: '',
                firstName: '',
                status: '',
            },
        });
    }

    async findAll(opts?: QueryDto) {
        const [total, users] = await this.prisma.$transaction([
            this.prisma.user.aggregate({
                _count: { id: true },
                where: { ...opts.where.user },
            }),
            this.prisma.user.findMany({
                skip: opts.pagination.skip,
                take: opts.pagination.take,
                where: { ...opts.where.user },
            }),
        ]);
        return {
            total: total._count.id,
            data: users,
            take: opts.pagination.take,
            skip: opts.pagination.skip,
        } as Response<User>;
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
