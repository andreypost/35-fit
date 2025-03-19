## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ nvm list
$ nvm current
$ nvm use v18.13.0

$ npm install --frozen-lockfile
```

## Running the app

```bash

# development
$ npm run start

# watch mode
$ npm run start:dev

# inspect mode: chrome://inspect
$ npm run start:debug

# production mode
$ npm run start:prod


# in case of: Error  EACCES: permission denied, rmdir '/home/andrii/Projects/35-fit/nest-api/dist/src',
sudo chown -R andrii:andrii /home/andrii/Projects/35-fit/nest-api/dist


```

## Migration database

```bash

# typeorm cache clear
$ npx typeorm cache:clear

# create migration
npm run typeorm:generate src/db/migrations/YOUR-MIGRATION-NAME

npm run typeorm:show

npm run typeorm:run

# revert can be run only after: npm run typeorm:run
npm run typeorm:revert

# !!! FULLY DELETE ALL TABLES !!!
npm run typeorm:drop
# also delete /dist build dir with existing migration files
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

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
