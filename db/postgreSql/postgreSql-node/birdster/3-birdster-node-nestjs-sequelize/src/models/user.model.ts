import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import { Tweet } from './tweet.model';

@Table({ tableName: 'users', timestamps: false })
export class User extends Model<User> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ allowNull: false, unique: true })
  username: string;

  @Column({ field: 'created_at' })
  createdAt?: Date;

  @HasMany(() => Tweet)
  tweets: Tweet[];
}
