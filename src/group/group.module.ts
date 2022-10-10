import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GroupService } from './application/group.service'
import { GroupRepository } from './infrastructure/group.repository'
import { GroupController } from './ui/group.controller'

@Module({
  imports: [TypeOrmModule.forFeature([GroupRepository])],
  providers: [GroupService],
  exports: [GroupService],
  controllers: [GroupController],
})
export class GroupModule {}
