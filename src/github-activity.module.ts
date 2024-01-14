import { Module, DynamicModule, Provider } from '@nestjs/common';
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

  static forRootAsync(options: {
    imports: any[];
    inject: any[];
    useFactory: (...args: any[]) => Promise<GithubActivityConfig>;
  }): DynamicModule {
    const providers: Provider[] = [
      {
        provide: 'GITHUB_ACTIVITY_CONFIG',
        useFactory: options.useFactory,
        inject: options.inject,
      },
      GithubActivityService,
    ];

    return {
      module: GithubActivityModule,
      imports: options.imports,
      providers,
      exports: [GithubActivityService],
    };
  }
}
