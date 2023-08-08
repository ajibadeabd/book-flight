import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

describe('TestController (e2e)', () => {
  let app;
  const bookRecord = {
    author: 'kord',
    isbn: '12@337687' + Date.now(),
    description: 'description for book',
    name: 'merlin',
  };
  let bookRecordId;
  const wrongId = Date.now();

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/test (GET) All Book records', () => {
    return request(app.getHttpServer())
      .get('/books/1/10')
      .expect(200)
      .expect(({ body: data }) => {
        expect(data.message).toBe('Record fetch successfully');
      });
  });
  it('/test (POST)   create book record', () => {
    return request(app.getHttpServer())
      .post('/books')
      .send(bookRecord)
      .expect(201)
      .expect(({ body: data }) => {
        expect(data.data.author).toBe(bookRecord.author);
        expect(data.data.name).toBe(bookRecord.name);
        expect(data.message).toBe('Book record has been saved successfully');
        bookRecordId = data.data.id;
      });
  });

  it('/test (POST)   should re create book record with the same isbn value', () => {
    return request(app.getHttpServer())
      .post('/books')
      .send(bookRecord)
      .expect(400)
      .expect(({ body: data }) => {
        expect(data.message).toBe(
          `Book with isbn \"${bookRecord.isbn}" number has been created earlier`,
        );
      });
  });
  it('/test (Get)   should get a single book record', () => {
    return request(app.getHttpServer())
      .get(`/books/${bookRecordId}`)
      .expect(200)
      .expect(({ body: data }) => {
        expect(data.message).toBe(`Book record retrieve successfully`);
        expect(data.data.name).toBe(bookRecord.name);
        // expect(data.data).toContain(bookRecord);
         
      });
  });
  it('/test (Get)   should get a single book record with wrong id', () => {
    return request(app.getHttpServer())
      .get(`/books/${wrongId}`)
      .expect(404)
      .expect(({ body: data }) => {
        expect(data.message).toBe(`Record not found with book id ${wrongId}`);
      });
  });

  it('/test (Update)   should update  book record with correct book id', () => {
    const newName = 'updated name';
    return request(app.getHttpServer())
      .patch(`/books/${bookRecordId}`)
      .send({ name: newName })
      .expect(200)
      .expect(({ body: data }) => {
        expect(data.message).toBe(`Book Record has been updated  successfully`);
      });
  });
  it('/test (Update)   should update  book record with wrong id', () => {
    return request(app.getHttpServer())
      .patch(`/books/${wrongId}`)
      .send(bookRecord)
      .expect(404)
      .expect(({ body: data }) => {
        expect(data.message).toBe(`Record not found with book id ${wrongId}`);
      });
  });
  it('/test (DELETE)   should delete book record ', () => {
    return request(app.getHttpServer())
      .delete(`/books/${bookRecordId}`)
      .send(bookRecord)
      .expect(200)
      .expect(({ body: data }) => {
        expect(data.message).toBe(`Book deleted successfully`);
      });
  });

  it('/test (DELETE)   should delete book record  with wrong id ', () => {
    return request(app.getHttpServer())
      .delete(`/books/${wrongId}`)
      .send(bookRecord)
      .expect(404)
      .expect(({ body: data }) => {
        expect(data.message).toBe(`Record not found with book id ${wrongId}`);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
