import { NestFactory } from '@nestjs/core';

import { GithubActivityModule } from './github-activity.module';

async function bootstrap() {
  await NestFactory.create(GithubActivityModule);
}
bootstrap();

export * from './github-activity.service';
export * from './github-activity.module';
export * from './interfaces/github-activity.interface';
