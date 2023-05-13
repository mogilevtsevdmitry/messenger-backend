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
        const [total, rows] = await this.prisma.$transaction([
            this.prisma.user.aggregate({
                _count: { id: true },
                where: { ...opts.where.user },
            }),
            this.prisma.user.findMany({
                skip: opts.pagination.offset,
                take: opts.pagination.limit,
                where: { ...opts.where.user },
            }),
        ]);
        return Response.returnMany<User>({ total, opts, rows });
    }

    async findOne(userId: string) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        return Response.returnOne<User>(user);
    }

    async findByEmail(email: string) {
        const user = await this.prisma.user.findFirst({ where: { email } });
        return Response.returnOne<User>(user);
    }

    async updateOne(userId: string, dto: any) {
        const user = await this.prisma.user.update({ data: dto, where: { id: userId } });
        return Response.returnOne<User>(user);
    }

    async deleteOne(userId: string) {
        const user = await this.prisma.user.delete({ where: { id: userId } });
        return Response.returnOne<User>(user);
    }
}
