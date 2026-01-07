import './instrumentation';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Important for correct IP detection behind proxies
  app.set('trust proxy', true);

  await app.listen(process.env.PORT ?? 3001);
}
void bootstrap();
