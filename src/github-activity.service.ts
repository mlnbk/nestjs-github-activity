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

  async fetchGithubActivities(limit = 100): Promise<GithubActivityResponse> {
    let activities: GithubActivity[] = [];
    let url = new URL(
      `https://api.github.com/users/${this.config.userName}/events/public`,
    );

    while (activities.length < limit) {
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
      let data: GithubActivity[] = await response.json();
      data = data.filter((a) =>
        Object.keys(GithubActivityType).includes(a.type),
      );

      if (activities.length + data.length > limit) {
        data = data.slice(0, limit - activities.length);
      }

      activities = activities.concat(data);

      const linkHeader = response.headers.get('Link');
      const nextLink = linkHeader
        ?.split(', ')
        .find((link) => link.endsWith('rel="next"'));
      if (!nextLink) {
        break;
      }
      url = new URL(
        nextLink.slice(nextLink.indexOf('<') + 1, nextLink.indexOf('>')),
      );
    }

    const filteredData: GithubActivityResponse = activities.map((a) => ({
      type: a.type,
      created_at: a.created_at,
      actor: {
        display_login: a.actor.display_login,
        url: `https://github.com/${a.actor.display_login}`,
        avatar_url: a.actor.avatar_url,
      },
      repo: {
        name: a.repo.name,
        url: `https://github.com/${a.repo.name}`,
      },
      payload: {
        action: a.payload.action,
      },
    }));
    return filteredData;
  }
}
