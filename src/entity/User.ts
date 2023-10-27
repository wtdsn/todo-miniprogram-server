import { Column, Index, Entity } from 'typeorm';

@Index('openId', ['openId'], { unique: true })
@Entity('user', { schema: 'todo-miniprogram' })
export class User {
  @Column('int', { primary: true, name: 'uid' })
  uid: number;

  @Column('char', { name: 'openId', unique: true, length: 64 })
  openId: string;
}
