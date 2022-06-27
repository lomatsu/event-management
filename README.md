# event-management
Este repositório é um MVP criado para gerir eventos


Ambientes:

- Production - [link-prod](link-prod)
- Local - [link-dev](link-dev)


## Contents

- [Structure](#structure)
- [Usage](#usage)

## Structure

Projeto escrito utilizando [NodeJS](https://nodejs.org/en/), [Express](https://expressjs.com/) and [Typescript](https://www.typescriptlang.org/).

```
src
  |_ bin
  |_ common
  |_ config
  |_ database
  |     |_ migrations
  |     |_ model
  |     |_ seeds
  |_ repositories
  |_ routes
  |_ sample
  |_ view-model
  app.ts
.gitignore
jest.config
package-lock.json
package.json
README.md
tsconfig.json
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
