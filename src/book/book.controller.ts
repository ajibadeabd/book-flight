import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { ApiOkResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger'; // Import Swagger decorators
import { BookService } from './book.service';
import { Response } from 'express';
import { HttpResponse } from '../util';
import { IBook, IBookParam, IBookUpdate, IGetBooks } from './types';

@ApiTags('Books') // Add a tag to group related endpoints
@Controller('/books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get(':page/:limit')
  @ApiOkResponse({ description: 'Books fetched successfully' }) // Add response description for Swagger
  async getBooksList(
    @Res() res: Response,
    @Param() bookParams: IGetBooks,
  ): Promise<Response<any, Record<string, any>>> {
    const response = await this.bookService.getBooks(bookParams);
    return HttpResponse.ok(res, response, 'Record fetch successfully');
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Book fetched successfully' }) // Add response description for Swagger
  async getEachBook(
    @Res() res: Response,
    @Param() data: IBookParam,
  ): Promise<Response<any, Record<string, any>>> {
    console.log(data);
    const response = await this.bookService.getBook(+data.id);
    return HttpResponse.ok(res, response, 'Book record retrieve successfully');
  }

  @Post()
  @ApiCreatedResponse({ description: 'Book created successfully' }) // Add response description for Swagger
  async createBookRecord(
    @Res() res: Response,
    @Body() data: IBook,
  ): Promise<Response<any, Record<string, any>>> {
    const response = await this.bookService.createBook(data);
    return HttpResponse.created(
      res,
      response,
      'Book record has been saved successfully',
    );
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Book deleted successfully' }) // Add response description for Swagger
  async deleteBookRecord(
    @Res() res: Response,
    @Param() data: IBookParam,
  ): Promise<Response<any, Record<string, any>>> {
    await this.bookService.deleteBook(+data.id);
    return HttpResponse.ok(res, null, 'Book deleted successfully');
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Book updated successfully' }) // Add response description for Swagger
  async updateBookRecord(
    @Res() res: Response,
    @Body() data: IBookUpdate,
    @Param() param: IBookParam,
  ): Promise<Response<any, Record<string, any>>> {
    await this.bookService.updateBookRecord(data, +param.id);
    return HttpResponse.ok(
      res,
      null,
      'Book Record has been updated  successfully',
    );
  }
}
