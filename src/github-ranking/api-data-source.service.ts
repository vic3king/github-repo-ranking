import { Injectable, Inject } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import {
  GitHubDataSource,
  IGitHubRepository,
} from './github-data-source.interface';
import { map } from 'rxjs/operators';
import * as csvParser from 'csv-parser';

@Injectable()
export class ApiDataSourceService implements GitHubDataSource {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async fetchRepositories(
    date: string,
    language: string,
    limit: number,
  ): Promise<IGitHubRepository[]> {
    const cacheKey = `${date}-${language}-${limit}`;

    const cachedData =
      await this.cacheManager.get<IGitHubRepository[]>(cacheKey);

    if (cachedData) {
      console.log('Fetching data from cache', date, language, limit);
      return cachedData;
    }

    const url = `https://raw.githubusercontent.com/EvanLi/Github-Ranking/master/Data/github-ranking-${date}.csv`;

    const data = await this.httpService
      .get(url)
      .pipe(map((response) => this.parseCsvToJson(response.data)))
      .toPromise();

    await this.cacheManager.set(cacheKey, data);

    const filteredData = this.filterAndLimitRepositories(data, language, limit);

    return filteredData;
  }

  private parseCsvToJson(csvData: string): IGitHubRepository[] {
    const jsonArray = [];
    csvParser({ separator: ',' })
      .on('data', (data) => jsonArray.push(data))
      .write(csvData);

    return jsonArray;
  }

  private filterAndLimitRepositories(
    repositories: IGitHubRepository[],
    language: string,
    limit: number,
  ): IGitHubRepository[] {
    const filtered = repositories.filter(
      (repository) =>
        repository.language.toLowerCase() === language.toLowerCase(),
    );

    const limited = filtered.slice(0, limit);

    return limited;
  }
}
