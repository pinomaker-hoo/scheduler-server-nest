import { BaseTimeEntity } from 'src/common/entity/baseTime.entity'
import { Group } from 'src/group/domain/group.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'tbl_group-todos' })
export class GroupTodos extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  idx: number

  @Column()
  title: string

  @Column()
  date: string

  @Column()
  place: string

  @ManyToOne((type) => Group, (group) => group.groupTodos, {
    onDelete: 'CASCADE',
  })
  group: Group
}
