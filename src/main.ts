import { NestFactory } from '@nestjs/core';

import { GithubActivityModule } from './github-activity.module';

async function bootstrap() {
  const app = await NestFactory.create(GithubActivityModule);
  await app.listen(3000);
}
bootstrap();

export * from './github-activity.service';
export * from './github-activity.module';
export * from './interfaces/github-activity.interface';
