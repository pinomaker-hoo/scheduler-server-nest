import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { User } from 'src/auth/domain/user.entity'
import { Group } from '../domain/group.entity'
import { SaveGroupDto } from '../dto/group.save.dto'
import { UpdateGroupDto } from '../dto/group.update.dto'
import { GroupRepository } from '../infrastructure/group.repository'

@Injectable()
export class GroupService {
  constructor(private readonly groupRepository: GroupRepository) {}

  async saveGroup(madePerson: User, body: SaveGroupDto): Promise<Group> {
    try {
      const group = this.groupRepository.create({
        madePerson,
        name: body.name,
        color: body.color,
        password: body.password,
        memberCount: body.memberCount,
        madePersonIdx: madePerson.idx,
      })
      return await this.groupRepository.save(group)
    } catch (err) {
      console.log(err)
      throw new HttpException('BAD', HttpStatus.BAD_REQUEST)
    }
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

  async updateGroup(idx: number, body: UpdateGroupDto) {
    try {
      return await this.groupRepository.update(idx, {
        name: body.name,
        color: body.color,
        memberCount: body.memberCount,
        password: body.password,
      })
    } catch (err) {
      console.log(err)
      throw new HttpException('BAD', HttpStatus.BAD_REQUEST)
    }
  }
}
