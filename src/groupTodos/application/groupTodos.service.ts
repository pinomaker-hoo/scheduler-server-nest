import { Injectable } from '@nestjs/common'
import { GroupTodosRepository } from '../infrastructure/groupTodos.repository'

@Injectable()
export class GroupTodosService {
  constructor(private readonly groupTodosRepository: GroupTodosRepository) {}
}
