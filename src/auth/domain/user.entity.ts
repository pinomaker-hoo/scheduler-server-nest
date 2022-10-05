import { BaseTimeEntity } from 'src/common/entity/baseTime.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ type: 'varchar', length: 50 })
  id: string;

  @Column({ type: 'varchar', length: 120 })
  password: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  salt: string;
}
