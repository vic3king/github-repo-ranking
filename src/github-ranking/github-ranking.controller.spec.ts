import { Test, TestingModule } from '@nestjs/testing';
import { GitHubRankingController } from './github-ranking.controller';
import { GitHubRankingService } from './github-ranking.service';

describe('GitHubRankingController', () => {
  let controller: GitHubRankingController;
  let service: GitHubRankingService;

  beforeEach(async () => {
    const mockGitHubDataSource = {
      fetchRepositories: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [GitHubRankingController],
      providers: [
        GitHubRankingService,

        {
          provide: 'GitHubDataSource',
          useValue: mockGitHubDataSource,
        },
      ],
    }).compile();

    controller = module.get<GitHubRankingController>(GitHubRankingController);
    service = module.get<GitHubRankingService>(GitHubRankingService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('getRepositories', () => {
    it('should return an array of repositories', async () => {
      const result = [
        {
          rank: '35',
          item: 'top-100-stars',
          repo_name: 'go',
          stars: '113777',
          forks: '17011',
          language: 'Go',
          repo_url: 'https://github.com/golang/go',
          username: 'golang',
          issues: '8276',
          last_commit: '2023-08-22T02:48:55Z',
          description: 'The Go programming language',
        },
      ];

      jest
        .spyOn(service, 'getTopRepositories')
        .mockImplementation(async () => result);

      const date = '2023-08-22';
      const language = 'Go';
      const limit = 1;

      const request = await controller.getTopRepositories(
        date,
        language,
        limit,
      );

      expect(request).toBe(result);
    });
  });
});
