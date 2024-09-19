import { Column, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user.model';

@Table({ tableName: 'tweets', timestamps: false })
export class Tweet extends Model<Tweet> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ field: 'tweet_content' })
  tweetContent: string;

  @Column({ field: 'created_at' })
  createdAt: Date;

  @ForeignKey(() => User)
  @Column({ field: 'user_id' })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
