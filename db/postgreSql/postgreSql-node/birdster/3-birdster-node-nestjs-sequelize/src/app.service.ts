import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Tweet } from './models/tweet.model';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Tweet) private tweetModel: typeof Tweet,
  ) {}

  async getAllUsers() {
    return this.userModel.findAll();
  }

  async getAllTweets() {
    return this.tweetModel.findAll({ include: [User] });
  }

  async getTweetsFromUser(username: string) {
    const user = await this.userModel.findOne({ where: { username } });
    return this.tweetModel.findAll({ where: { userId: user.id }, include: [User] });
  }
}
