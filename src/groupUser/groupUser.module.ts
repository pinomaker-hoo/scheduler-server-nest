import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GroupUserService } from './application/groupUser.service'
import { GroupUserRepository } from './infrastructure/groupUser.repository'
import { GroupUserController } from './ui/groupUser.controller'

@Module({
  imports: [TypeOrmModule.forFeature([GroupUserRepository])],
  providers: [GroupUserService],
  controllers: [GroupUserController],
})
export class GroupUserModule {}
