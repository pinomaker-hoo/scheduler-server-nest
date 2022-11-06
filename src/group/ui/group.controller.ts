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
import { GroupService } from '../application/group.service'
import { Group } from '../domain/group.entity'
import { SaveGroupDto } from '../dto/group.save.dto'
import { UpdateGroupDto } from '../dto/group.update.dto'

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get()
  async getGroupList(): Promise<Group[]> {
    return await this.groupService.getGroupList()
  }

  @Post()
  @UseGuards(JwtGuard)
  async saveGroup(@Req() req, @Body() body: SaveGroupDto): Promise<Group> {
    return await this.groupService.saveGroup(req.user, body)
  }

  @Get('/:id')
  async getGroup(@Param('id') idx: string) {
    return await this.groupService.findGroupWithTodo(Number(idx))
  }

  @Delete('/:id')
  async deleteGroup(@Param('id') idx: string) {
    return await this.groupService.deleteGroup(Number(idx))
  }

  @Put('/:id')
  async updateGroup(@Param('id') idx: string, @Body() body: UpdateGroupDto) {
    return await this.groupService.updateGroup(Number(idx), body)
  }
}
