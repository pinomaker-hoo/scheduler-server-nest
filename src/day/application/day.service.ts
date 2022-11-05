import { Injectable } from '@nestjs/common'
import { DayRepository } from '../infrastructure/day.repository'

@Injectable()
export class DayService {
  constructor(private readonly dayRepository: DayRepository) {}
}
