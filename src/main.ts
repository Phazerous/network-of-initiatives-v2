import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.use(cookieParser());

  app.enableCors({
    origin: ['http://localhost:3001'],
    credentials: true,
  });

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap();
