import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common'
import { JwtGuard } from 'src/auth/passport/auth.jwt.guard'
import { ApiResponse } from 'src/common/dto/response.dto'
import { GroupService } from '../application/group.service'
import { Group } from '../domain/group.entity'
import { SaveGroupDto } from '../dto/group.save.dto'
import { UpdateGroupDto } from '../dto/group.update.dto'

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get()
  async getGroupList() {
    const response = await this.groupService.getGroupList()
    return ApiResponse.of({
      data: response,
      message: 'Success Get GroupList',
      statusCode: 200,
    })
  }

  @Post()
  @UseGuards(JwtGuard)
  async saveGroup(@Req() req, @Body() body: SaveGroupDto) {
    const response = await this.groupService.saveGroup(req.user, body)
    return ApiResponse.of({
      data: response,
      message: 'Success Save Group',
      statusCode: 200,
    })
  }

  @Get('/:id')
  async getGroup(@Param('id') idx: string) {
    const response = await this.groupService.findGroupWithTodo(Number(idx))
    return ApiResponse.of({
      data: response,
      message: 'Success Get Group',
      statusCode: 200,
    })
  }

  @Delete('/:id')
  async deleteGroup(@Param('id') idx: string) {
    const response = await this.groupService.deleteGroup(Number(idx))
    return ApiResponse.of({
      data: response,
      message: 'Success Delete Group',
      statusCode: 200,
    })
  }

  @Put('/:id')
  async updateGroup(@Param('id') idx: string, @Body() body: UpdateGroupDto) {
    const response = await this.groupService.updateGroup(Number(idx), body)
    return ApiResponse.of({
      data: response,
      message: 'Success Update Group',
      statusCode: 200,
    })
  }
}
