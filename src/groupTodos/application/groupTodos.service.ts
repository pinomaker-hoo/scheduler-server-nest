import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { GroupService } from 'src/group/application/group.service'
import { Group } from 'src/group/domain/group.entity'
import { GroupTodos } from '../domain/groupTodos.entity'
import { SaveTodosDto } from '../dto/groupTodos.save.dto'
import { GroupTodosRepository } from '../infrastructure/groupTodos.repository'

@Injectable()
export class GroupTodosService {
  constructor(
    private readonly groupTodosRepository: GroupTodosRepository,
    private readonly groupService: GroupService,
  ) {}
  async getTodosList(idx: number): Promise<GroupTodos[]> {
    try {
      const group: Group = await this.groupService.findGroupByIdx(idx)
      return await this.groupTodosRepository.find({ where: { group } })
    } catch (err) {
      console.log(err)
      throw new HttpException('BAD', HttpStatus.BAD_REQUEST)
    }
  }

  async saveTodos(idx: number, body: SaveTodosDto) {
    try {
      const group: Group = await this.groupService.findGroupByIdx(idx)
      const todos = this.groupTodosRepository.create({
        group,
        date: body.date,
        title: body.title,
        place: body.place,
      })
      return await this.groupTodosRepository.save(todos)
    } catch (err) {
      console.log(err)
      throw new HttpException('BAD', HttpStatus.BAD_REQUEST)
    }
  }

  async saveTodosLoop(group: Group, body: SaveTodosDto) {
    try {
      for (let i = 2020; i < 2030; i++) {
        const date = body.date.substring(5)
        const todos = this.groupTodosRepository.create({
          group,
          date: `${i}-${date}`,
          title: body.title,
          place: body.place,
        })
        await this.groupTodosRepository.save(todos)
      }
      return true
    } catch (err) {
      console.log(err)
      throw new HttpException('BAD', HttpStatus.BAD_REQUEST)
    }
  }
}
