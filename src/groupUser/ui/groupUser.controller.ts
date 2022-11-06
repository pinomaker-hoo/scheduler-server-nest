import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { JwtGuard } from 'src/auth/passport/auth.jwt.guard'
import { GroupUserService } from '../application/groupUser.service'

@Controller('groupUser')
export class GroupUserController {
  constructor(private readonly groupUserService: GroupUserService) {}

  @Post('/:id')
  @UseGuards(JwtGuard)
  async saveGroupUser(@Req() req, @Param('id') idx: string) {
    console.log(idx, req.user)
    return await this.groupUserService.saveUser(req.user, Number(idx))
  }

  @Get()
  @UseGuards(JwtGuard)
  async getList(@Req() req) {
    return await this.groupUserService.findGroupUserList(req.user)
  }

  @Delete('/:id')
  @UseGuards(JwtGuard)
  async deleteGroupUser(@Param('id') idx: string, @Req() req) {
    return await this.groupUserService.deleteGroupUser(req.user, Number(idx))
  }
}
