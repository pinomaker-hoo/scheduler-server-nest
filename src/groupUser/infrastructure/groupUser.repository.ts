import { EntityRepository, Repository } from 'typeorm'
import { GroupUser } from '../domain/groupUser.entity'

@EntityRepository(GroupUser)
export class GroupUserRepository extends Repository<GroupUser> {}
