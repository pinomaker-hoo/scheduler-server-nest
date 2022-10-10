import { BaseTimeEntity } from 'src/common/entity/baseTime.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from '../../auth/domain/user.entity'

@Entity({ name: 'tbl_todos' })
export class Todos extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  idx: number

  @Column()
  title: string

  @Column()
  date: string

  @Column()
  place: string

  @ManyToOne((type) => User, (user) => user.todos)
  user: User
}
