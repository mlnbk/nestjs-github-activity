import { Module, DynamicModule } from '@nestjs/common';
import { GithubActivityService } from './github-activity.service';
import { GithubActivityConfig } from './interfaces/github-activity.interface';

@Module({})
export class GithubActivityModule {
  static forRoot(config: GithubActivityConfig): DynamicModule {
    return {
      module: GithubActivityModule,
      providers: [
        GithubActivityService,
        {
          provide: 'GITHUB_ACTIVITY_CONFIG',
          useValue: config,
        },
      ],
      exports: [GithubActivityService],
    };
  }
}
