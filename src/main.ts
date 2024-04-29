import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

// docker run --name kupipodariday -e POSTGRES_USER=student -e POSTGRES_PASSWORD=student -e POSTGRES_DB=kupipodariday -p 5432:5432 -d postgres
