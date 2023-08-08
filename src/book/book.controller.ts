import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './entity/book.entity';
import { Response, Request } from 'express';
import { HttpResponse } from 'src/util';
import { IBook, IBookUpdate, IGetBooks } from './types';

@Controller('/books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get(':page/:limit')
  async getBooksList(
    @Res() res: Response,

    @Param() bookParams: IGetBooks,
  ) {
    const response = await this.bookService.getBooks(bookParams);
    return HttpResponse.ok(res, response);
  }
  @Get(':id')
  async getEachBook(@Res() res: Response, @Param('id') bookId: number) {
    const response = await this.bookService.getBook(bookId);
    return HttpResponse.ok(res, response);
  }

  @Post()
  async createBookRecord(@Res() res: Response, @Body() data: IBook) {
    const response = await this.bookService.createBook(data);
    return HttpResponse.created(
      res,
      response,
      'Book record has been saved successfully',
    );
  }

  @Delete(':id')
  async deleteBookRecord(@Res() res: Response, @Param('id') bookId: number) {
    await this.bookService.deleteBook(bookId);
    return HttpResponse.ok(res, null, 'Book deleted successfully');
  }
  @Patch(':id')
  async updateBookRecord(
    @Res() res: Response,
    @Body() data: IBookUpdate,
    @Param('id') bookId: number,
  ) {
    await this.bookService.updateBookRecord(data, bookId);
    return HttpResponse.ok(
      res,
      null,
      'Book Record has been updated  successfully',
    );
  }
}
