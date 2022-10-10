import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TodosService } from './application/todos.service'
import { TodosRepository } from './infrastructure/todos.repository'
import { TodosController } from './ui/todos.controller'

@Module({
  imports: [TypeOrmModule.forFeature([TodosRepository])],
  providers: [TodosService],
  controllers: [TodosController],
})
export class TodosModule {}
