import { User } from 'src/auth/domain/user.entity'
import { BaseTimeEntity } from 'src/common/entity/baseTime.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'tbl_day' })
export class Day extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  idx: number

  @Column()
  date: string

  @Column()
  name: string

  @ManyToOne((type) => User, (user) => user.day)
  user: User
}
