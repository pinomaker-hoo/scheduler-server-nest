import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { Response } from 'express'
import { AuthService } from '../application/auth.service'
import { User } from '../domain/user.entity'
import { RequestUserSaveDto } from '../dto/user.save.dto'
import { LocalGuard } from '../passport/auth.local.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async test() {
    return 'Hello world'
  }

  @Post()
  async localRegister(@Body() body: RequestUserSaveDto) {
    return await this.authService.localRegister(body)
  }

  @Post('/local')
  @UseGuards(LocalGuard)
  async localLogin(@Req() req) {
    const { user }: { user: User } = req
    const token = await this.authService.signJwtWithIdx(user.idx)
    return { user, token }
  }

  @Post('/check')
  async findUserById(@Body() body): Promise<User> {
    return await this.authService.findById(body.id)
  }
}
