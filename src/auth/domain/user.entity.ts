import { BaseTimeEntity } from 'src/common/entity/baseTime.entity'
import { Day } from 'src/day/domain/day.entity'
import { Group } from 'src/group/domain/group.entity'
import { GroupUser } from 'src/groupUser/domain/groupUser.entity'
import { Todos } from 'src/todos/domain/todos.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'tbl_user' })
export class User extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  idx: number

  @Column({ type: 'varchar', length: 50 })
  id: string

  @Column({ type: 'varchar', length: 120 })
  password: string

  @Column({ type: 'varchar', length: 50 })
  name: string

  @OneToMany((type) => Todos, (todos) => todos.user)
  todos: Todos[]

  @OneToMany((type) => Group, (group) => group.madePerson)
  groupMadePerson: Group[]

  @OneToMany((type) => GroupUser, (GroupUser) => GroupUser.user)
  groupUser: GroupUser[]

  @OneToMany((type) => Day, (day) => day.user)
  day: Day[]
}
