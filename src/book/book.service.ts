import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BookService as BookDataFactory } from './database.factory';
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
}
