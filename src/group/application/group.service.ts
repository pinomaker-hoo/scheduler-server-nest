import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { User } from 'src/auth/domain/user.entity'
import { GroupUserService } from 'src/groupUser/application/groupUser.service'
import { Group } from '../domain/group.entity'
import { SaveGroupDto } from '../dto/group.save.dto'
import { GroupRepository } from '../infrastructure/group.repository'

@Injectable()
export class GroupService {
  constructor(private readonly groupRepository: GroupRepository) {}

  async saveGroup(madePerson: User, body: SaveGroupDto): Promise<Group> {
    console.log(madePerson)
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
    try {
      return await this.groupRepository.find({ relations: ['madePerson'] })
    } catch (err) {
      console.log(err)
      throw new HttpException('BAD', HttpStatus.BAD_REQUEST)
    }
  }

  async findGroupByIdx(idx: number): Promise<Group> {
    try {
      return await this.groupRepository.findOne({
        where: { idx },
      })
    } catch (err) {
      console.log(err)
      throw new HttpException('BAD', HttpStatus.BAD_REQUEST)
    }
  }

  async findGroupWithTodo(idx: number) {
    try {
      return await this.groupRepository.findOne({
        where: { idx },
        relations: ['madePerson', 'groupTodos'],
      })
    } catch (err) {
      console.log(err)
      throw new HttpException('BAD', HttpStatus.BAD_REQUEST)
    }
  }

  async deleteGroup(idx: number) {
    try {
      return await this.groupRepository.delete(idx)
    } catch (err) {
      console.log(err)
      throw new HttpException('BAD', HttpStatus.BAD_REQUEST)
    }
  }
}
