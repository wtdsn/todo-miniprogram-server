import { Column, Index, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Index('creatorId', ['creatorId'], {})
@Entity('task', { schema: 'todo-miniprogram' })
export class Task {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('char', { name: 'task', length: 127 })
  task: string;

  @Column('tinyint', { name: 'priority' })
  priority: number;

  @Column('tinyint', { name: 'isDone' })
  isDone: number;

  @Column('date', { name: 'deadline' })
  deadline: string;

  @Column('char', { name: 'creatorId', length: 32 })
  creatorId: string;

  @Column('timestamp', {
    name: 'createTime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;
}
