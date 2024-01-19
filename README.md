# GitHub Activity Service

This service fetches and filters public activity data from GitHub for a specific user.

## Usage

This module is not published on npm, so you need to use `npm link` to create a symbolic link in your global `node_modules` folder that links to this module. Here's how you can do it:

1. First, clone the repository to your local machine:

`git clone https://github.com/mlnbk/nestjs-github-activity.git`

2. Navigate to the directory of the cloned repository:

`cd github-activity-service`

3. Install the dependencies:

`npm install`

4. Build the project:

`npm run build`

5. Link the project:

`npm link`

Now, in your target application, you can link to this module:

`npm link nestjs-github-activity`

Then, you can import and use the module in your application:

```
import {
  GithubActivityConfig,
  GithubActivityModule,
} from 'nestjs-github-activity';

const githubServiceConfig: GithubActivityConfig = {
  userName: 'githubUsername',
  githubPersonalAccessToken: 'yourGithubPersonalAccessToken',
};

@Module({
  imports: [GithubActivityModule.forRoot(githubServiceConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

Please replace 'githubUsername' and 'yourGithubPersonalAccessToken' with the actual GitHub username and personal access token.

### Service Usage

The main service is `GithubActivityService` which fetches and filters public activity data from GitHub. It uses the `fetchGithubActivities` method to fetch the data.

Example NestJS usage (after correct `AppModule` inject):

```
import { Controller, Get } from '@nestjs/common';
import {
  GithubActivityResponse,
  GithubActivityService,
} from 'nestjs-github-activity';

@Controller()
export class AppController {
  constructor(private readonly githubService: GithubActivityService) {}

  @Get('/github-activities')
  async getGitHubActivities(): Promise<GithubActivityResponse> {
    const activities = await this.githubService.fetchGithubActivities({ limit: 50 }); // optional limit parameter
    return activities;
  }
}
```

## Miscellaneous

### Installation

```bash
$ npm install
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
