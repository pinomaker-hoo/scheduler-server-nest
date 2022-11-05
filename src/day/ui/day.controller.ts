import { Controller } from '@nestjs/common'
import { DayService } from '../application/day.service'

@Controller('day')
export class DayController {
  constructor(private readonly dayService: DayService) {}
}
