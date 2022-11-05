import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DayService } from './application/day.service'
import { DayRepository } from './infrastructure/day.repository'
import { DayController } from './ui/day.controller'

@Module({
  imports: [TypeOrmModule.forFeature([DayRepository])],
  providers: [DayService],
  controllers: [DayController],
})
export class DayModule {}
