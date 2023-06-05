import { RegisterWithEmailNamespace } from '@contracts/services/auth';
import { DeleteUserNamespace, FindUserNamespace, UpdateUserNamespace } from '@contracts/services/user';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@providers/prisma/prisma.service';
import { User } from '@shared/interfaces';
import { IQueryPipe } from '@shared/pipes';
import { Response } from '@shared/responses';
import { genSalt, hash } from 'bcrypt';
import { UserValidation } from './cases/user.validation';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService, private readonly userValidation: UserValidation) {}

    async create(data: RegisterWithEmailNamespace.Request): Promise<RegisterWithEmailNamespace.Response> {
        const hashedPassword = await hash(data.password, await genSalt(10));

        const user = await this.prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                nickname: '',
                lastName: '',
                firstName: '',
                status: '',
            },
        });

        return Response.returnOne<User>(user);
    }

    async findAll(opts?: IQueryPipe) {
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

    async findOne(userIdOrEmail: FindUserNamespace.Request | string): Promise<FindUserNamespace.Response> {
        if (typeof userIdOrEmail == 'string') {
            const foundUser = await this.findByPk(userIdOrEmail);
            return Response.returnOne<User>(foundUser);
        }

        if (typeof userIdOrEmail == 'object') {
            const user = this.userValidation.userIdOrEmailToObject(userIdOrEmail);

            if ((user.id && !user.email) || (user.id && user.email)) {
                const foundUser = await this.findByPk(user.id);
                return Response.returnOne<User>(foundUser);
            }

            if (user.email && !user.id) {
                const foundUser = await this.findByEmail(user.email);
                return Response.returnOne<User>(foundUser);
            }
        }

        return Response.returnBadRequest(`Не указан email или пароль`);
    }

    private async findByPk(userId: string) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        return Response.returnOne<User>(user);
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.prisma.user.findFirst({ where: { email } });
        return Response.returnOne<User>(user);
    }

    async updateOne(userId: string, dto: UpdateUserNamespace.Request): Promise<UpdateUserNamespace.Response> {
        const user = await this.prisma.user.update({ data: { ...dto }, where: { id: userId } });
        return Response.returnOne<User>(user);
    }

    async deleteOne(userId: string) {
        const user = await this.prisma.user.delete({ where: { id: userId } });
        return Response.returnOne<User>(user);
    }
}
