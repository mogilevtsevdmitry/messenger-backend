import { Module } from '@nestjs/common';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';

@Module({
    controllers: [LoginController],
    providers: [LoginService],
})
export class LocalModule {}
