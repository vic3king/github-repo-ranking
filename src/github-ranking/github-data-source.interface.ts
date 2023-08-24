export interface IGitHubRepository {
  rank: string;
  item: string;
  repo_name: string;
  stars: string;
  forks: string;
  language: string;
  repo_url: string;
  username: string;
  issues: string;
  last_commit: string;
  description: string;
}

export interface GitHubDataSource {
  fetchRepositories(
    date: string,
    language: string,
    limit: number,
  ): Promise<IGitHubRepository[]>;
}
