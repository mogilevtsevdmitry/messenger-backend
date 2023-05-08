import { faker } from '@faker-js/faker';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from '@shared/interfaces';
import { Exclude } from 'class-transformer';

export class UserResponse implements User {
    @ApiProperty({ type: String, description: 'Идентификатор пользователя', example: faker.datatype.uuid() })
    id: string;

    @ApiProperty({ type: String, description: 'Электронная почта пользователя', example: faker.internet.email() })
    email: string;

    @ApiProperty({
        type: Date,
        description: 'Дата создания учетной записи',
        example: new Date('01.01.2023'),
        default: new Date(),
    })
    createdAt: Date;

    @Exclude()
    updatedAt: Date;

    @ApiPropertyOptional({ type: String, description: 'Псевдоним пользователя', example: 'CoolUser' })
    nickname?: string;

    @ApiPropertyOptional({ type: String, description: 'Имя пользователя', example: 'Иван' })
    firstName?: string;

    @ApiPropertyOptional({ type: String, description: 'Фамилия пользователя', example: 'Иванов' })
    lastName?: string;

    @ApiPropertyOptional({ type: Date, description: 'Дата рождения пользователя', example: new Date('01.01.1990') })
    birthday?: Date;

    @ApiPropertyOptional({ type: String, description: 'Пол пользователя', example: 'мужской' })
    sex?: string;

    @ApiProperty({
        type: [String],
        description: 'Список URL фотографий пользователя',
        example: ['https://example.com/photo1.jpg', 'https://example.com/photo2.jpg'],
        default: [],
    })
    photo: string[];

    @ApiPropertyOptional({
        type: Number,
        description: 'Номер телефона пользователя',
        example: faker.phone.number('79#########'),
    })
    phone?: number;

    @ApiPropertyOptional({ type: String, description: 'Статус пользователя', example: 'Онлайн' })
    status?: string;

    @ApiPropertyOptional({
        type: String,
        description: 'Информация о пользователе',
        example: 'Люблю путешествовать и кататься на велосипеде.',
    })
    aboutMe?: string;

    @Exclude()
    password: string;

    @Exclude()
    token: string[];

    @ApiProperty({ type: [String], description: 'Роли пользователя в системе', example: ['user', 'admin'] })
    roles: string[];

    constructor(user: Partial<User>) {
        Object.assign(this, user);
    }
}
