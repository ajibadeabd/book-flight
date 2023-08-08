// import { Test, TestingModule } from '@nestjs/testing';
// import { BookController } from './book.controller';
// import { BookService } from './book.service';
// import { HttpResponse } from '../util';
// import { IBook, IBookUpdate } from './types';
// import { Response } from 'express';

// describe('BookController', () => {
//   let bookController: BookController;
//   let bookService: BookService;

//   const mockBookService = {
//     getBooks: jest.fn(() => []),
//     getBook: jest.fn(),
//     createBook: jest.fn(),
//     deleteBook: jest.fn(),
//     updateBookRecord: jest.fn(),
//   };

//   const mockResponse = {
//     ok: jest.fn(),
//     created: jest.fn(),
//   };

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [BookController],
//       providers: [
//         { provide: BookService, useValue: mockBookService },
//         { provide: HttpResponse, useValue: mockResponse },
//       ],
//     }).compile();

//     bookController = module.get<BookController>(BookController);
//     bookService = module.get<BookService>(BookService);
//   });

//   describe('getBooksList', () => {
//     it('should return list of books', async () => {
//       const expectedResult = {}; // your expected result here

//       mockBookService.getBooks.mockResolvedValue(expectedResult);

//       const response: Response = {
//         status: jest.fn(() => {
//           return { json: jest.fn() };
//         }),
//         json: jest.fn(),
//       } as any;
//       const data = await bookController.getBooksList(response, {
//         page: '1',
//         limit: '10',
//       });
//       console.log({ data });

//       // expect(mockBookService.getBooks).toHaveBeenCalledWith({
//       //   page: '1',
//       //   limit: '10',
//       // });
//       // expect(mockResponse.ok).toHaveBeenCalledWith(response, expectedResult);
//     });
//   });

//   // Similarly, write tests for other methods: getEachBook, createBookRecord, deleteBookRecord, updateBookRecord
// });
