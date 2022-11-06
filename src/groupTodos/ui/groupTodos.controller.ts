import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiResponse } from 'src/common/dto/response.dto'
import { GroupTodosService } from '../application/groupTodos.service'
import { SaveTodosDto } from '../dto/groupTodos.save.dto'

@Controller('groupTodos')
export class GroupTodosController {
  constructor(private readonly groupTodosService: GroupTodosService) {}

  @Get('/:id')
  async getTodos(@Param('id') idx: string) {
    const response = await this.groupTodosService.getTodosList(Number(idx))
    return ApiResponse.of({
      data: response,
      message: 'Success Get Group Todos',
      statusCode: 200,
    })
  }

  @Post('/:id')
  async saveTodos(@Param('id') idx: string, @Body() body: SaveTodosDto) {
    const response = await this.groupTodosService.saveTodos(Number(idx), body)
    return ApiResponse.of({
      data: response,
      message: 'Success Save Group Todos',
      statusCode: 200,
    })
  }
}
