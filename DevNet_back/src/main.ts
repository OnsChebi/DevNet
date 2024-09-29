import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe}from "@nestjs/common";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api/");//sets a global route prefix for all endpoints
  app.useGlobalPipes(
    new ValidationPipe({//wher pipe is configured
      whitelist:true,//keep the data  clean
      forbidNonWhitelisted:true //ensure only allowed fields r accepted

    })
  )
  await app.listen(3000);
}
bootstrap();
