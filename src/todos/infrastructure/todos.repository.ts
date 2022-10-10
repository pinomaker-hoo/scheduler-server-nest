import { EntityRepository, Repository } from 'typeorm'
import { Todos } from '../domain/todos.entity'

@EntityRepository(Todos)
export class TodosRepository extends Repository<Todos> {}
