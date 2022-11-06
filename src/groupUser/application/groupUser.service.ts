import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
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
    try {
      const findGroupUser = await this.groupUserRepository.findOne({
        where: { user: user.idx, group: groupIdx },
      })
      if (findGroupUser) throw new HttpException('BAD', HttpStatus.BAD_REQUEST)
      const group = await this.groupService.findGroupByIdx(groupIdx)
      const groupUser = this.groupUserRepository.create({ user, group })
      return await this.groupUserRepository.save(groupUser)
    } catch (err) {
      console.log(err)
      throw new HttpException('BAD', HttpStatus.BAD_REQUEST)
    }
  }

  async findGroupUserList(user: User) {
    try {
      return await this.groupUserRepository.find({
        where: { user },
        relations: ['group'],
      })
    } catch (err) {
      console.log(err)
      throw new HttpException('BAD', HttpStatus.BAD_REQUEST)
    }
  }

  async deleteGroupUser(idx: number) {
    try {
      const findGroupUser = await this.groupUserRepository.findOne({
        where: { idx },
      })
      return await this.groupUserRepository.delete(idx)
    } catch (err) {
      console.log(err)
      throw new HttpException('BAD', HttpStatus.BAD_REQUEST)
    }
  }
}
