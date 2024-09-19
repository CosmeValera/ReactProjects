import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { databaseConfig } from './config/database.config';
import { User } from './models/user.model';
import { Tweet } from './models/tweet.model';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    SequelizeModule.forRoot(databaseConfig),
    SequelizeModule.forFeature([User, Tweet]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
