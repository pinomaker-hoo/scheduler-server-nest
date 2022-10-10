import { Injectable } from '@nestjs/common'
import { User } from 'src/auth/domain/user.entity'
import { Group } from '../domain/group.entity'
import { SaveGroupDto } from '../dto/group.save.dto'
import { GroupRepository } from '../infrastructure/group.repository'

@Injectable()
export class GroupService {
  constructor(private readonly groupRepository: GroupRepository) {}

  async saveGroup(madePerson: User, body: SaveGroupDto): Promise<Group> {
    const group = this.groupRepository.create({
      madePerson,
      name: body.name,
      color: body.color,
      password: body.password,
      memberCount: body.memberCount,
    })
    return await this.groupRepository.save(group)
  }

  async getGroupList(): Promise<Group[]> {
    return await this.groupRepository.find()
  }
}
