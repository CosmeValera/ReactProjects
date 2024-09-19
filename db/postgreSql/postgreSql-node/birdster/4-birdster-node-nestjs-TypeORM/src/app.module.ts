import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';  // Entity example
import { Tweet } from './entities/tweet.entity';

import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Tweet],  // Add your entities here
      synchronize: true, // Set to false in production
    }),
    TypeOrmModule.forFeature([User, Tweet]), // Import your entities here
  ],
})
export class AppModule {}
