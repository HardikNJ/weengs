import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier of the task' })
  id: number;

  @Column()
  @ApiProperty({ description: 'The title of the task' })
  title: string;

  @Column()
  @ApiProperty({ description: 'The description of the task' })
  description: string;

  @Column({ default: 'pending' })
  @ApiProperty({
    description: 'The status of the task',
    enum: ['pending', 'completed'],
  })
  status: string;

  @Column({ type: 'timestamp', nullable: true })
  @ApiProperty({
    description: 'The timestamp when the task was completed',
    nullable: true,
  })
  completed_at: Date | null;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
}
