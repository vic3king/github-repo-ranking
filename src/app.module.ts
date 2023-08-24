import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GitHubRankingModule } from './github-ranking/github-ranking.module';

@Module({
  imports: [
    CacheModule.register({ isGlobal: true, ttl: 84600 }),
    GitHubRankingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
