import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BookDataFactory } from './database.factory';
import { Book } from './entity/book.entity';
import { IBook, IBookUpdate, IGetBooks } from './types';
@Injectable()
export class BookService {
  constructor(private readonly bookDataFactory: BookDataFactory) {}
  async getBooks(bookParams: IGetBooks): Promise<Book[]> {
    return this.bookDataFactory.findAll(bookParams);
  }

  async getBook(id: number): Promise<Book> {
    const book = await this.bookDataFactory.findOne(id);
    if (!book) {
      throw new HttpException(
        `Record not found with book id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return book;
  }

  async createBook(data: IBook): Promise<Book> {
    try {
      const book = await this.bookDataFactory.create(data);
      return book;
    } catch (error: any) {
      if (error.message.indexOf('Duplicate entry') > -1) {
        throw new HttpException(
          `Book with isbn "${data.isbn}" number has been created earlier`,
          400,
        );
      }
    }
  }
  async deleteBook(bookId: number): Promise<void> {
    const book = await this.bookDataFactory.remove(bookId);
    if (!book.affected) {
      throw new HttpException(
        `Record not found with book id ${bookId}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return;
  }
  async updateBookRecord(book: IBookUpdate, bookId: number): Promise<void> {
    const response = await this.bookDataFactory.update(book, bookId);
    if (!response.affected) {
      throw new HttpException(
        `Record not found with book id ${bookId}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return;
  }
}
