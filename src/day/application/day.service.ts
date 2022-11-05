import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { User } from 'src/auth/domain/user.entity'
import { Day } from '../domain/day.entity'
import { DayRepository } from '../infrastructure/day.repository'

@Injectable()
export class DayService {
  constructor(private readonly dayRepository: DayRepository) {}
  async saveDay(user: User, name: string, date: string) {
    try {
      const findDay = await this.findDayByUser(user)
      if (findDay) return await this.updateDay(findDay, name, date)
      const saveDay: Day = this.dayRepository.create({ date, user, name })
      return await this.dayRepository.save(saveDay)
    } catch (err) {
      console.log(err)
      throw new HttpException('bad', HttpStatus.BAD_REQUEST)
    }
  }

  async updateDay(day: Day, name: string, date: string) {
    try {
      console.log(name, date)
      if (name && date)
        return await this.dayRepository.update(day, { name, date })
      if (name) return await this.dayRepository.update(day, { name })
      if (date) return await this.dayRepository.update(day, { date })
    } catch (err) {
      console.log(err)
      throw new HttpException('bad', HttpStatus.BAD_REQUEST)
    }
  }

  async findDayByUser(user: User) {
    try {
      return await this.dayRepository.findOne({ where: { user: user.idx } })
    } catch (err) {
      console.log(err)
      throw new HttpException('bad', HttpStatus.BAD_REQUEST)
    }
  }
}
