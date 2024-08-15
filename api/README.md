## Description

## Installation

```bash

```

## Running the app

```bash

# development
$ npm run start

# watch mode
$ npm run start:dev

# inspect mode: chrome://inspect
$ npm run start:dev:inspect

```

## Migration database

```bash

# typeorm cache clear
$ npx typeorm cache:clear

# create migration
npm run typeorm:generate src/migration/YOUR-MIGRATION-NAME

npm run typeorm:show

npm run typeorm:run

# revert can be run only after: npm run typeorm:run
npm run typeorm:revert

# !!! FULLY DELETE ALL TABLES !!!
npm run typeorm:drop

```

## Test

```bash

```
