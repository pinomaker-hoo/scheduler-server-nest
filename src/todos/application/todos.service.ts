import { Body, Injectable } from '@nestjs/common'
import { User } from 'src/auth/domain/user.entity'
import { Todos } from '../domain/todos.entity'
import { SaveTodosDto } from '../dto/todos.save.dto'
import { TodosRepository } from '../infrastructure/todos.repository'

@Injectable()
export class TodosService {
  constructor(private readonly todosRepository: TodosRepository) {}

  async getTodosList(user: User): Promise<Todos[]> {
    return await this.todosRepository.find({ where: { user } })
  }

  async saveTodos(user: User, body: SaveTodosDto): Promise<Todos> {
    const todos = this.todosRepository.create({
      user,
      date: body.date,
      title: body.title,
      place: body.place,
    })
    return await this.todosRepository.save(todos)
  }
}
