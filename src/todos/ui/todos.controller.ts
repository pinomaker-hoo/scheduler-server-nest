import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { JwtGuard } from 'src/auth/passport/auth.jwt.guard'
import { ApiResponse } from 'src/common/dto/response.dto'
import { TodosService } from '../application/todos.service'
import { Todos } from '../domain/todos.entity'
import { SaveTodosDto } from '../dto/todos.save.dto'

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @UseGuards(JwtGuard)
  async saveTodos(@Req() req, @Body() body: SaveTodosDto) {
    const response = await this.todosService.saveTodos(req.user, body)
    return ApiResponse.of({
      data: response,
      message: 'Success Save Todos',
      statusCode: 200,
    })
  }

  @Get()
  @UseGuards(JwtGuard)
  async getTodosList(@Req() req) {
    const response = await this.todosService.getTodosList(req.user)
    return ApiResponse.of({
      data: response,
      message: 'Success Get Todos',
      statusCode: 200,
    })
  }
}
