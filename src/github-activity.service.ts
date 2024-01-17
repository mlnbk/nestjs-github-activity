import { Inject, Injectable } from '@nestjs/common';

import {
  GithubActivity,
  GithubActivityConfig,
  GithubActivityResponse,
  GithubActivityType,
} from './interfaces/github-activity.interface';

@Injectable()
export class GithubActivityService {
  private config: GithubActivityConfig;

  constructor(@Inject('GITHUB_ACTIVITY_CONFIG') config: GithubActivityConfig) {
    this.config = config;
  }

  async fetchGithubActivities(): Promise<GithubActivityResponse> {
    const url = new URL(
      `https://api.github.com/users/${this.config.userName}/events/public`,
    );
    const params = new URLSearchParams({ per_page: '100' });
    url.search = params.toString();

    const response = await fetch(url.toString(), {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${this.config.githubPersonalAccessToken}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });

    if (!response.ok) {
      throw new Error(
        `GitHub API request failed with status ${response.status}`,
      );
    }

    const data: GithubActivity[] = await response.json();
    const filteredData: GithubActivityResponse = data
      .filter((d) => Object.keys(GithubActivityType).includes(d.type))
      .map((d) => ({
        type: d.type,
        created_at: d.created_at,
        actor: {
          display_login: d.actor.display_login,
          url: `https://github.com/${d.actor.display_login}`,
          avatar_url: d.actor.avatar_url,
        },
        repo: {
          name: d.repo.name,
          url: `https://github.com/${d.repo.name}`,
        },
        payload: {
          action: d.payload.action,
        },
      }));
    return filteredData;
  }
}
