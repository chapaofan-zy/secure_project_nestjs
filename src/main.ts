import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { JwtMiddleware } from './middleware/jwt/jwt.middleware';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://127.0.0.1:5173',
    credentials: true,
  });
  app.use(
    session({
      secret: 'chapaofan',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(JwtMiddleware);
  // app.enableCors();
  await app.listen(3001);
}
bootstrap();
