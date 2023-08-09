
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test:unt

# e2e tests
$ npm run test:e2e 
# e2e tests coverage
$ npm run test:e2e:coverage

# test coverage
$ npm run test:unit:coverage
```

## Endpoints

### GET /books/:page/:limit

Retrieve a list of books.

- Parameters:
  - `page` (number): Page number for pagination.
  - `limit` (number): Number of items per page.

- Example Request: `/books/1/10`

- Example Response:
  ```json
  {
    "data": [...], // List of book records
    "message": "Record fetch successfully"
  }