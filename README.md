<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest
## Description

Simple nestJS application to return GitHub top-rated
repositories. Your endpoint should have 3 input parameters:

- Date: the date of the ranking. Ex: 2019-02-22
- Language: the programming language that you will filter by
- Limit: The max amount of values your endpoint will return
  
## Installation

```bash
$ npm install
```

## Running the app

```bash
# run with docker
$ docker-compose up

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

$ once app is up and running make requests to http://localhost:3000/api/github-ranking?date=2023-08-22&language=Javascript&limit=10 using any parameter of choice

```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Technologies

- [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
- [Cache-manager](https://docs.nestjs.com/techniques/caching) Nest provides a unified API for various cache storage providers. The built-in one is an in-memory data store which I used for this assessment

## Stay in touch

- Author - [Victory Akaniru](https://victoryakaniru.com/)

## License

Nest is [MIT licensed](LICENSE).
