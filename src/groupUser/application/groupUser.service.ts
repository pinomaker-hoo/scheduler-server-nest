import { Injectable } from '@nestjs/common'
import { GroupUserRepository } from '../infrastructure/groupUser.repository'

@Injectable()
export class GroupUserService {
  constructor(private readonly groupUserRepository: GroupUserRepository) {}
}
