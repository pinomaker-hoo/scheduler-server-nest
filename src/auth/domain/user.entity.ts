import { BaseTimeEntity } from 'src/common/entity/baseTime.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column()
  name: string;
}
