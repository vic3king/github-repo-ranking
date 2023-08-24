import { Injectable, Inject } from '@nestjs/common';
import { GitHubDataSource } from './github-data-source.interface';

@Injectable()
export class GitHubRankingService {
  constructor(
    @Inject('GitHubDataSource') private readonly dataSource: GitHubDataSource,
  ) {}

  async getTopRepositories(date: string, language: string, limit: number) {
    const repositories = await this.dataSource.fetchRepositories(
      date,
      language,
      limit,
    );

    return repositories;
  }
}
