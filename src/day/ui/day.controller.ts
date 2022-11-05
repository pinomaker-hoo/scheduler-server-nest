import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { JwtGuard } from 'src/auth/passport/auth.jwt.guard'
import { DayService } from '../application/day.service'

@Controller('day')
export class DayController {
  constructor(private readonly dayService: DayService) {}
  @Post()
  @UseGuards(JwtGuard)
  async saveDay(@Req() req, @Body() body) {
    return await this.dayService.saveDay(req.user, body.name, body.date)
  }

  @Get()
  @UseGuards(JwtGuard)
  async getDay(@Req() req) {
    return await this.dayService.findDayByUser(req.user)
  }
}
