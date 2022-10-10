import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GroupModule } from 'src/group/group.module'
import { GroupUserService } from './application/groupUser.service'
import { GroupUserRepository } from './infrastructure/groupUser.repository'
import { GroupUserController } from './ui/groupUser.controller'

@Module({
  imports: [TypeOrmModule.forFeature([GroupUserRepository]), GroupModule],
  providers: [GroupUserService],
  exports: [GroupUserService],
  controllers: [GroupUserController],
})
export class GroupUserModule {}
