import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GroupModule } from 'src/group/group.module'
import { GroupTodosService } from './application/groupTodos.service'
import { GroupTodosRepository } from './infrastructure/groupTodos.repository'
import { GroupTodosController } from './ui/groupTodos.controller'

@Module({
  imports: [TypeOrmModule.forFeature([GroupTodosRepository]), GroupModule],
  providers: [GroupTodosService],
  controllers: [GroupTodosController],
})
export class GroupTodosModule {}
