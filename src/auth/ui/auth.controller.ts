import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../application/auth.service';
import { User } from '../domain/user.entity';
import { RequestUserSaveDto } from '../dto/user.save.dto';
import { LocalGuard } from '../passport/auth.local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async localRegister(@Body() body : RequestUserSaveDto) {
    return await this.authService.localRegister()
  }

  @Post('/local')
  @UseGuards(LocalGuard)
  async localLogin(@Req() req, @Res() res: Response) {
    const { user }: { user: User } = req;
    const token = await this.authService.signJwtWithIdx(user.idx);
    res.send({ user, token });
  }
}
