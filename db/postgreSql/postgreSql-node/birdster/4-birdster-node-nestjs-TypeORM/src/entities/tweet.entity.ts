import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('tweets')
export class Tweet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'tweet_content', nullable: true })
  tweetContent: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => User, user => user.tweets)
  user: User;
}
