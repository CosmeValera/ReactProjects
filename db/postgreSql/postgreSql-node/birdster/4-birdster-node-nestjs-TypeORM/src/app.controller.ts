import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('users')
  getUsers() {
    return this.appService.findAllUsers();
  }

  @Get('tweets')
  getTweets() {
    return this.appService.findAllTweets();
  }

  @Get('tweets-from/:username')
  getTweetsFromUser(@Param('username') username: string) {
    return this.appService.findTweetsFromUser(username);
  }
}
