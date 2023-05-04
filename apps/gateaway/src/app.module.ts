import { Module } from '@nestjs/common'
import { SharedModule } from '@shared'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'

@Module({
	imports: [SharedModule, AuthModule, UserModule],
})
export class AppModule {}
