
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


### GET /books/:id

Retrieve a   books record.

- Parameters:
  - `id` (number): book id to retrieve.

- Example Request: `/books/333`

- Example Response:
  ```json
  {
  
    "data": {
      "id": 1,
        "author: "kord",
        "isbn": "fefersssssssssdsfre",
        "description": "update description",
        "name": "book name",
        "created_at": "2023-08-08T21:42:05.786Z",
        "updated_at": "2023-08-08T22:11:13.000Z"
    }, 
    "message": "Book record retrieve successfully"
  }
  
  ```

### DELETE /books/:id

delete a list of books.

- Parameters:
  - `id` (number): book id to delete.

- Example Request: `/books/333`

- Example Response:
  ```json
  {
    "data": null, 
    "message": "Book deleted successfully"
  }
  
  ```


### UPDATE /books/:id

update a list of books.

- Parameters:
  - `id` (number): book id to delete.

- Example Request: `/books/333`

- Example Response:
  ```json
  {
    "data": null, 
    "Book Record has been updated  successfully"
  }
  
  ```



### POST /books

create book record.

- Parameters:
  - `isbn` (String): unique reference for t.
  - `author` (String): author of the new book .
  - `description` (String): description of the new book to be added.
  - `name` (String): name of the new book to be added.

- Example Request: `/books`

- Example Response:
  ```[json]
  {
    "data": {
      "id": 1,
        "author: "kord",
        "isbn": "fefersssssssssdsfre",
        "description": "update description",
        "name": "book name",
        "created_at": "2023-08-08T21:42:05.786Z",
        "updated_at": "2023-08-08T22:11:13.000Z"
    }, 
    "message": "Book record retrieve successfully"
  }
  ```

