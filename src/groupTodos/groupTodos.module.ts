import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GroupTodosService } from './application/groupTodos.service'
import { GroupTodosRepository } from './infrastructure/groupTodos.repository'
import { GroupTodosController } from './ui/groupTodos.controller'

@Module({
  imports: [TypeOrmModule.forFeature([GroupTodosRepository])],
  providers: [GroupTodosService],
  controllers: [GroupTodosController],
})
export class GroupTodosModule {}
