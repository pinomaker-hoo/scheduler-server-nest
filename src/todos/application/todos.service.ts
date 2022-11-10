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

  async saveTodos(user: User, body: SaveTodosDto) {
    try {
      if (body.year) {
        return this.saveTodosLoop(user, body)
      }
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
  async saveTodosLoop(user: User, body: SaveTodosDto) {
    try {
      for (let i = 2020; i < 2030; i++) {
        const date = body.date.substring(5)
        const todos = this.todosRepository.create({
          user,
          date: `${i}-${date}`,
          title: body.title,
          place: body.place,
        })
        await this.todosRepository.save(todos)
      }
      return true
    } catch (err) {
      console.log(err)
      throw new HttpException('BAD', HttpStatus.BAD_REQUEST)
    }
  }
}
