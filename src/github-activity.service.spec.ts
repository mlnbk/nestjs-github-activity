import { Test, TestingModule } from '@nestjs/testing';
import { describe, it } from 'node:test';

import { GithubActivityService } from './github-activity.service';

describe('GithubActivityService', () => {
  let service: GithubActivityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GithubActivityService,
        {
          provide: 'GITHUB_ACTIVITY_CONFIG',
          useValue: {
            userName: 'mockUserName',
            githubPersonalAccessToken: 'mockGithubPersonalAccessToken',
          },
        },
      ],
    }).compile();

    service = module.get<GithubActivityService>(GithubActivityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
