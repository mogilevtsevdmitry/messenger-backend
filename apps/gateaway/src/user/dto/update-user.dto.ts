import { faker } from '@faker-js/faker';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { User } from '@shared/interfaces';

export class UpdateUserDto implements Partial<Omit<User, 'id'>> {
    @ApiPropertyOptional({ type: String, description: 'Email пользователя', example: faker.internet.email() })
    email?: string;

    @ApiPropertyOptional({ type: String, description: 'Ник пользователя', example: 'nickname' })
    nickname?: string;

    @ApiPropertyOptional({ type: String, description: 'Имя пользователя', example: 'Иван' })
    firstName?: string;

    @ApiPropertyOptional({ type: String, description: 'Фамилия пользователя', example: 'Иванов' })
    lastName?: string;

    @ApiPropertyOptional({ type: String, description: 'Дата рождения', example: new Date('2000-01-10').toString() })
    birthday?: Date;

    @ApiPropertyOptional({ type: String, description: 'Пол пользователя', example: 'муж' })
    sex?: string;

    @ApiPropertyOptional({ type: [String], description: 'Фото пользователя', example: '/photos/1.jpg' })
    photo: string[];

    @ApiPropertyOptional({
        type: String,
        description: 'Тел пользователя',
        example: faker.phone.number('7 9##-###-####'),
    })
    phone?: number;

    @ApiPropertyOptional({ type: String, description: 'Статус пользователя', example: 'CREATED' })
    status?: string;

    @ApiPropertyOptional({ type: String, description: 'Описание пользователя', example: 'Что-то интересное обо мне' })
    aboutMe?: string;

    @ApiPropertyOptional({ type: String, description: 'Пароль пользователя', example: 'Qwerty1234!' })
    password: string;
}
