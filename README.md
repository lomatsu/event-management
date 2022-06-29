# event-management
Este repositório é um MVP criado para gerir eventos


Ambientes:

- Production - [omatsu-events-management.herokuapp.com](https://omatsu-events-management.herokuapp.com)
- Local - [localhost:3000](http://localhost:3000/)


## Contents

- [Structure](#structure)
- [Usage](#usage)

## Structure

Projeto escrito utilizando [NodeJS](https://nodejs.org/en/), [Express](https://expressjs.com/) and [Typescript](https://www.typescriptlang.org/).

```
src
  |_ bin
  |_ common
  |     |_ middlewares
  |_ config
  |_ database
  |     |_ helps
  |     |_ migrations
  |     |_ model
  |     |_ seeds
  |_ event
  |_ purchase
  |_ repositories
  |_ routes
  |_ user
  |_ view-model
  app.ts
```

## Usage

```bash

# build

npm run build

# run develop

npm run start:dev

# unit tests

npm run test
# run production

npm run start

# run develop migrations

npm run knex:migrate

# run production migrations

npm run knex:migrate:prod


```

**Docker**

Rodando o banco localmente com docker

```bash

docker-compose up -d

```
