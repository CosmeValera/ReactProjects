import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

// http://localhost:3000/users
// http://localhost:3000/tweets
// http://localhost:3000/tweets-from/Cosme