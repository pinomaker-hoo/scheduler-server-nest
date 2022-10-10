import { EntityRepository, Repository } from 'typeorm'
import { GroupTodos } from '../domain/groupTodos.entity'

@EntityRepository(GroupTodos)
export class GroupTodosRepository extends Repository<GroupTodos> {}
