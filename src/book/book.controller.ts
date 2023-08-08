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
}
