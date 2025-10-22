// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { envSchema } from './config/env.validation';

async function bootstrap() {
  try {
    envSchema.parse(process.env);
    console.log('[ENV] Environment variables validated successfully.');
  } catch (error) {
    console.error('❌ Invalid environment variables:', error.format());
    process.exit(1);
  }

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3001;

  app.enableCors();

  await app.listen(port);
  console.log(`[Nest] Backend running on http://localhost:${port}`);
}
bootstrap();