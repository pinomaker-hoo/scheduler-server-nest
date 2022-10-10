import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { JwtGuard } from 'src/auth/passport/auth.jwt.guard'
import { GroupService } from '../application/group.service'
import { Group } from '../domain/group.entity'
import { SaveGroupDto } from '../dto/group.save.dto'

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
    return await this.groupService.saveGroup(req.body, body)
  }
}
