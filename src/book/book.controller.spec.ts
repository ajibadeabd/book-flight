import { HttpException, HttpStatus } from '@nestjs/common';
import { BookService } from './book.service'; // Update the import path based on your project structure
import { Book } from './entity/book.entity';

describe('BookService', () => {
  let bookService: BookService;
  let bookDataFactoryMock: any;

  beforeEach(() => {
    // Mocking the BookDataFactory dependency
    bookDataFactoryMock = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      remove: jest.fn(),
      update: jest.fn(),
    };

    bookService = new BookService(bookDataFactoryMock);
  });

  describe('getBooks', () => {
    it('should return a list of books', async () => {
      const bookList: Book[] = [
        /* mock book objects */
        {
          id: 1,
          author: 'kord',
          isbn: 'fefersssssssssdsfre',
          description: 'update description',
          name: 'book name',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 9876,
          author: 'kord',
          isbn: 'fefersssssssssdsfre',
          description: 'update description',
          name: 'book name',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 22,
          author: 'kord',
          isbn: 'fefersssssssssdsfre',
          description: 'update description',
          name: 'book name',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];
      bookDataFactoryMock.findAll.mockResolvedValue(bookList);

      const result = await bookService.getBooks({
        limit: '1',
        page: '1',
      });

      expect(result).toEqual(bookList);
    });
  });

  describe('getBook', () => {
    it('should return a book when given a valid id', async () => {
      const mockBook: Book = {
        id: 1,
        author: 'kord',
        isbn: 'fefersssssssssdsfre',
        description: 'update description',
        name: 'book name',
        created_at: new Date(),
        updated_at: new Date(),
      };
      bookDataFactoryMock.findOne.mockResolvedValue(mockBook);

      const result = await bookService.getBook(1);

      expect(result).toEqual(mockBook);
    });

    it('should throw HttpException with status 404 when given an invalid id', async () => {
      bookDataFactoryMock.findOne.mockResolvedValue(null);

      await expect(bookService.getBook(999)).rejects.toThrow(HttpException);
      await expect(bookService.getBook(999)).rejects.toHaveProperty(
        'status',
        HttpStatus.NOT_FOUND,
      );
    });
  });

  describe('createBook', () => {
    it('should create a new book', async () => {
      const mockBookData = {
        author: 'kord',
        isbn: 'fefersssssssssdsfre',
        description: 'update description',
        name: 'book name',
      };
      const createdBook: Book = {
        id: 1,
        author: 'kord',
        isbn: 'fefersssssssssdsfre',
        description: 'update description',
        name: 'book name',
        created_at: new Date(),
        updated_at: new Date(),
      };
      bookDataFactoryMock.create.mockResolvedValue(createdBook);

      const result = await bookService.createBook(mockBookData);

      expect(result).toEqual(createdBook);
    });

    it('should throw HttpException with status 400 when a duplicate entry error occurs', async () => {
      const mockBookData = {
        author: 'kord',
        isbn: 'fefersssssssssdsfre',
        description: 'update description',
        name: 'book name',
      };
      const duplicateError = new Error(
        `Book with isbn "${mockBookData.isbn}" number has been created earlier`,
      );
      duplicateError.message = 'Duplicate entry for ISBN';
      bookDataFactoryMock.create.mockRejectedValue(duplicateError);

      await expect(bookService.createBook(mockBookData)).rejects.toThrow(
        HttpException,
      );
      await expect(bookService.createBook(mockBookData)).rejects.toHaveProperty(
        'status',
        400,
      );
    });
  });

  describe('deleteBook', () => {
    it('should delete a book when given a valid id', async () => {
      const deletionResponse = { affected: 1 };
      bookDataFactoryMock.remove.mockResolvedValue(deletionResponse);

      await expect(bookService.deleteBook(1)).resolves.toBeUndefined();
    });

    it('should throw HttpException with status 404 when deleting an invalid id', async () => {
      const deletionResponse = { affected: 0 };
      bookDataFactoryMock.remove.mockResolvedValue(deletionResponse);

      await expect(bookService.deleteBook(999)).rejects.toThrow(HttpException);
      await expect(bookService.deleteBook(999)).rejects.toHaveProperty(
        'status',
        HttpStatus.NOT_FOUND,
      );
    });
  });

  describe('updateBookRecord', () => {
    it('should update a book record when given valid data and id', async () => {
      const updateResponse = { affected: 1 };
      bookDataFactoryMock.update.mockResolvedValue(updateResponse);

      await expect(
        bookService.updateBookRecord(
          {
            name: 'updated name',
            author: 'kord',
            description: 'description',
          },
          1,
        ),
      ).resolves.toBeUndefined();
    });

    it('should throw HttpException with status 404 when updating with an invalid id', async () => {
      const updateResponse = { affected: 0 };
      bookDataFactoryMock.update.mockResolvedValue(updateResponse);

      await expect(
        bookService.updateBookRecord(
          {
            name: 'updated name',
            author: 'kord',
            description: 'description',
          },
          999,
        ),
      ).rejects.toThrow(HttpException);
      await expect(
        bookService.updateBookRecord(
          {
            name: 'updated name',
            author: 'kord',
            description: 'description',
          },
          999,
        ),
      ).rejects.toHaveProperty('status', HttpStatus.NOT_FOUND);
    });
  });
});
