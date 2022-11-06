import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { User } from 'src/auth/domain/user.entity'
import { Todos } from '../domain/todos.entity'
import { SaveTodosDto } from '../dto/todos.save.dto'
import { TodosRepository } from '../infrastructure/todos.repository'

@Injectable()
export class TodosService {
  constructor(private readonly todosRepository: TodosRepository) {}

  async getTodosList(user: User): Promise<Todos[]> {
    try {
      return await this.todosRepository.find({ where: { user } })
    } catch (err) {
      console.log(err)
      throw new HttpException('BAD', HttpStatus.BAD_REQUEST)
    }
  }

  async saveTodos(user: User, body: SaveTodosDto): Promise<Todos> {
    try {
      const todos = this.todosRepository.create({
        user,
        date: body.date,
        title: body.title,
        place: body.place,
      })
      return await this.todosRepository.save(todos)
    } catch (err) {
      console.log(err)
      throw new HttpException('BAD', HttpStatus.BAD_REQUEST)
    }
  }
}
