import { Injectable } from '@nestjs/common'
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
    const group: Group = await this.groupService.findGroupByIdx(idx)
    return await this.groupTodosRepository.find({ where: { group } })
  }

  async saveTodos(idx: number, body: SaveTodosDto): Promise<GroupTodos> {
    const group: Group = await this.groupService.findGroupByIdx(idx)
    const todos = this.groupTodosRepository.create({
      group,
      date: body.date,
      title: body.title,
      place: body.place,
    })
    return await this.groupTodosRepository.save(todos)
  }
}
