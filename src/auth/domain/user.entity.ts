import { BaseTimeEntity } from 'src/common/entity/baseTime.entity'
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

  @Column({ type: 'varchar', length: 50 })
  salt: string

  @OneToMany((type) => Todos, (todos) => todos.user)
  todos: Todos[]
}
