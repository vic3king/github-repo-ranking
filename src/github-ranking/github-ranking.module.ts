import { Module } from '@nestjs/common';
import { GitHubRankingController } from './github-ranking.controller';
import { GitHubRankingService } from './github-ranking.service';
import { ApiDataSourceService } from './api-data-source.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [GitHubRankingController],
  providers: [
    GitHubRankingService,
    {
      provide: 'GitHubDataSource',
      useClass: ApiDataSourceService,
    },
  ],
})
export class GitHubRankingModule {}
