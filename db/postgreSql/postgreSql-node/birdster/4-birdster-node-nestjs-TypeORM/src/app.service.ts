import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Tweet } from './entities/tweet.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Tweet) private tweetRepository: Repository<Tweet>,
  ) {}

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findAllTweets(): Promise<Tweet[]> {
    return this.tweetRepository.find();
  }

  async findTweetsFromUser(username: string): Promise<Tweet[]> {
    const cosme = await this.userRepository.findOne({ where: { username: username } });
    return this.tweetRepository.find({ where: { user: cosme }, relations: ['user'] });
  }
}
