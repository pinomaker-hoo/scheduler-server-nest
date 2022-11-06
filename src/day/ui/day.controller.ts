import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { JwtGuard } from 'src/auth/passport/auth.jwt.guard'
import { ApiResponse } from 'src/common/dto/response.dto'
import { DayService } from '../application/day.service'

@Controller('day')
export class DayController {
  constructor(private readonly dayService: DayService) {}

  @Post()
  @UseGuards(JwtGuard)
  async saveDay(@Req() req, @Body() body) {
    const response = await this.dayService.saveDay(
      req.user,
      body.name,
      body.date,
    )
    return ApiResponse.of({
      data: response,
      message: 'Success Save Day',
      statusCode: 200,
    })
  }

  @Get()
  @UseGuards(JwtGuard)
  async getDay(@Req() req) {
    const response = await this.dayService.findDayByUser(req.user)
    return ApiResponse.of({
      data: response,
      message: 'Success Get Day',
      statusCode: 200,
    })
  }
}
