import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { JwtGuard } from 'src/auth/passport/auth.jwt.guard'
import { TodosService } from '../application/todos.service'
import { Todos } from '../domain/todos.entity'
import { SaveTodosDto } from '../dto/todos.save.dto'

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @UseGuards(JwtGuard)
  async saveTodos(@Req() req, @Body() body: SaveTodosDto): Promise<Todos> {
    return await this.todosService.saveTodos(req.user, body)
  }

  @Get()
  @UseGuards(JwtGuard)
  async getTodosList(@Req() req): Promise<Todos[]> {
    return await this.todosService.getTodosList(req.user)
  }
}
