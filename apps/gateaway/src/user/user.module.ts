import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { UserModule as AppUserModule } from 'apps/user/src/user.module'

@Module({
	imports: [
		ClientsModule.register([
			{
				name: 'USER_SERVICE',
				transport: Transport.TCP,
				options: { port: 5002, host: 'localhost' },
			},
		]),
		AppUserModule,
	],
	controllers: [UserController],
})
export class UserModule {}
