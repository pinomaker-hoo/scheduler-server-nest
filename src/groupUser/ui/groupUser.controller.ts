import { Controller } from '@nestjs/common'
import { GroupUserService } from '../application/groupUser.service'

@Controller('groupUser')
export class GroupUserController {
  constructor(private readonly groupUserService: GroupUserService) {}
}
