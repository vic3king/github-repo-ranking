import { Controller, Query, Get } from '@nestjs/common';
import { GitHubRankingService } from './github-ranking.service';

@Controller('api')
export class GitHubRankingController {
  constructor(private readonly gitHubRankingService: GitHubRankingService) {}

  @Get('/github-ranking')
  async getTopRepositories(
    @Query('date') date: string,
    @Query('language') language: string,
    @Query('limit') limit: number,
  ) {
    return this.gitHubRankingService.getTopRepositories(date, language, limit);
  }
}
