import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('users')
  getUsers() {
    return this.appService.getAllUsers();
  }

  @Get('tweets')
  getTweets() {
    return this.appService.getAllTweets();
  }

  @Get('tweets-from/:username')
  getTweetsFromUser(@Param('username') username: string) {
    return this.appService.getTweetsFromUser(username);
  }
}
