import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { GroupTodosService } from '../application/groupTodos.service'
import { GroupTodos } from '../domain/groupTodos.entity'
import { SaveTodosDto } from '../dto/groupTodos.save.dto'

@Controller('groupTodos')
export class GroupTodosController {
  constructor(private readonly groupTodosService: GroupTodosService) {}

  @Get('/:id')
  async getTodos(@Param('id') idx: string): Promise<GroupTodos[]> {
    return await this.groupTodosService.getTodosList(Number(idx))
  }

  @Post('/:id')
  async saveTodos(
    @Param('id') idx: string,
    @Body() body: SaveTodosDto,
  ): Promise<GroupTodos> {
    return await this.groupTodosService.saveTodos(Number(idx), body)
  }
}
