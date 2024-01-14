export type GithubActivity = {
  id: string;
  type: GithubActivityType;
  created_at: string;
  actor: {
    id: number;
    login: string;
    display_login: string;
    gravatar_id: string;
    url: string;
    avatar_url: string;
  };
  repo: {
    id: number;
    name: string;
    url: string;
  };
  payload: {
    action?: string;
    ref?: string;
    ref_type?: string;
    master_branch?: string;
    description?: string;
    pusher_type?: string;
    push_id?: number;
    size?: number;
    distinct_size?: number;
    head?: string;
    before?: string;
    number?: number;
    commits?: {
      sha: string;
      author: {
        email: string;
        name: string;
      };
      message: string;
      distinct: boolean;
      url: string;
    }[];
  };
};

export type GithubActivityResponse = {
  type: GithubActivityType;
  created_at: string;
  actor: {
    display_login: string;
    url: string;
    avatar_url: string;
  };
  repo: {
    name: string;
    url: string;
  };
  payload: {
    action?: string;
  };
}[];

export interface GithubActivityConfig {
  userName: string;
  githubPersonalAccessToken: string;
}

export enum GithubActivityType {
  CreateEvent = 'CreateEvent',
  IssuesEvent = 'IssuesEvent',
  IssueCommentEvent = 'IssueCommentEvent',
  PullRequestEvent = 'PullRequestEvent',
  PullRequestReviewEvent = 'PullRequestReviewEvent',
  PullRequestReviewCommentEvent = 'PullRequestReviewCommentEvent',
  PushEvent = 'PushEvent',
}
