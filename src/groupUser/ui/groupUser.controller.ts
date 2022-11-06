import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { JwtGuard } from 'src/auth/passport/auth.jwt.guard'
import { ApiResponse } from 'src/common/dto/response.dto'
import { GroupUserService } from '../application/groupUser.service'

@Controller('groupUser')
export class GroupUserController {
  constructor(private readonly groupUserService: GroupUserService) {}

  @Post('/:id')
  @UseGuards(JwtGuard)
  async saveGroupUser(@Req() req, @Param('id') idx: string) {
    const response = await this.groupUserService.saveUser(req.user, Number(idx))
    return ApiResponse.of({
      data: response,
      message: 'Success Save Group User',
      statusCode: 200,
    })
  }

  @Get()
  @UseGuards(JwtGuard)
  async getList(@Req() req) {
    const response = await this.groupUserService.findGroupUserList(req.user)
    return ApiResponse.of({
      data: response,
      message: 'Success Get Group User',
      statusCode: 200,
    })
  }

  @Delete('/:id')
  @UseGuards(JwtGuard)
  async deleteGroupUser(@Param('id') idx: string, @Req() req) {
    const response = await this.groupUserService.deleteGroupUser(
      req.user,
      Number(idx),
    )
    return ApiResponse.of({
      data: response,
      message: 'Success Delete Group User',
      statusCode: 200,
    })
  }
}
