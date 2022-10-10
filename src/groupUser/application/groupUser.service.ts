import { Injectable } from '@nestjs/common'
import { User } from 'src/auth/domain/user.entity'
import { GroupService } from 'src/group/application/group.service'
import { GroupUser } from '../domain/groupUser.entity'
import { GroupUserRepository } from '../infrastructure/groupUser.repository'

@Injectable()
export class GroupUserService {
  constructor(
    private readonly groupUserRepository: GroupUserRepository,
    private readonly groupService: GroupService,
  ) {}

  async saveUser(user: User, groupIdx: number): Promise<GroupUser> {
    const group = await this.groupService.findGroupByIdx(groupIdx)
    const groupUser = this.groupUserRepository.create({ user, group })
    return await this.groupUserRepository.save(groupUser)
  }

  async findGroupUserList(user: User) {
    return await this.groupUserRepository.find({
      where: { user },
      relations: ['group'],
    })
  }
}
