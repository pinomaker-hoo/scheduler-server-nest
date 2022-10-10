import { Controller } from '@nestjs/common'
import { GroupTodosService } from '../application/groupTodos.service'

@Controller('groupTodos')
export class GroupTodosController {
  constructor(private readonly groupTodosService: GroupTodosService) {}
}
