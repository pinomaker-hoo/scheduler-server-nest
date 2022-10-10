import { User } from 'src/auth/domain/user.entity'
import { BaseTimeEntity } from 'src/common/entity/baseTime.entity'
import { GroupUser } from 'src/groupUser/domain/groupUser.entity'
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity({ name: 'tbl_group' })
export class Group extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  idx: number

  @Column()
  name: string

  @Column()
  memberCount: number

  @Column()
  password: string

  @Column()
  color: string

  @ManyToOne((type) => User, (user) => user.groupMadePerson)
  madePerson: User

  @OneToMany((type) => GroupUser, (groupUser) => groupUser.group)
  groupUser: GroupUser[]
}
