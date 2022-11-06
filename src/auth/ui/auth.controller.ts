import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { ApiResponse } from 'src/common/dto/response.dto'
import { AuthService } from '../application/auth.service'
import { RequestUserSaveDto } from '../dto/user.save.dto'
import { JwtGuard } from '../passport/auth.jwt.guard'
import { LocalGuard } from '../passport/auth.local.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async localRegister(@Body() body: RequestUserSaveDto) {
    const response = await this.authService.localRegister(body)
    return ApiResponse.of({
      data: response,
      message: 'Success Save User',
      statusCode: 200,
    })
  }

  @Post('/local')
  @UseGuards(LocalGuard)
  async localLogin(@Req() req) {
    const { user } = req
    const token = await this.authService.signJwtWithIdx(user.idx)
    const response = { user, token }
    return ApiResponse.of({
      data: response,
      message: 'Success Local Login',
      statusCode: 200,
    })
  }

  @Post('/check')
  async findUserById(@Body() body) {
    const response = await this.authService.findById(body.id)
    return ApiResponse.of({
      data: response,
      message: 'Success Find User',
      statusCode: 200,
    })
  }

  @Patch('/image')
  @UseGuards(JwtGuard)
  async updateImage(@Req() req, @Body() body) {
    const response = await this.authService.updateImage(req.user, body.base)
    return ApiResponse.of({
      data: response,
      message: 'Success Find User',
      statusCode: 200,
    })
  }

  @Patch()
  @UseGuards(JwtGuard)
  async updatePassword(@Req() req, @Body() body) {
    const response = await this.authService.updatePassword(
      req.user,
      body.pasword,
    )
    return ApiResponse.of({
      data: response,
      message: 'Success Find User',
      statusCode: 200,
    })
  }

  @Delete()
  @UseGuards(JwtGuard)
  async deleteUser(@Req() req, @Body() body) {
    return await this.authService.deleteUser(req.user)
  }
}
