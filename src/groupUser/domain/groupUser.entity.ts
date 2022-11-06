import { User } from 'src/auth/domain/user.entity'
import { BaseTimeEntity } from 'src/common/entity/baseTime.entity'
import { Group } from 'src/group/domain/group.entity'
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'tbl_groupUser' })
export class GroupUser extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  idx: number

  @ManyToOne((type) => User, (user) => user.groupUser)
  user: User

  @ManyToOne((type) => Group, (group) => group.groupUser, {
    onDelete: 'CASCADE',
  })
  group: Group
}
