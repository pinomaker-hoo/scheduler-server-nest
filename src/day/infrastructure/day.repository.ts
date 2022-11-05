import { EntityRepository, Repository } from 'typeorm'
import { Day } from '../domain/day.entity'

@EntityRepository(Day)
export class DayRepository extends Repository<Day> {}
