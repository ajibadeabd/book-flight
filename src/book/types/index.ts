import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumberString,
  IsNumber,
} from 'class-validator';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Book } from '../entity/book.entity';

export class IBook {
  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  isbn: string;
}

export class IBookUpdate {
  @IsString()
  @IsOptional()
  author: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}

export class IGetBooks {
  @IsNumberString()
  @IsNotEmpty()

  //   @IsOptional()
  limit: string;

  @IsNumberString()
  @IsNotEmpty()

  //   @IsOptional()
  page: string;
}

export class IBookParam {
  @IsNumberString()
  @IsNotEmpty()
  id: string;
}

// Interface for the BookDataFactory
export interface IBookDaFactory {
  findAll(bookParams: IGetBooks): Promise<Book[]>;
  findOne(id: number): Promise<Book | null>;
  create(data: IBook): Promise<Book>;
  remove(bookId: number): Promise<DeleteResult>;
  update(book: IBookUpdate, bookId: number): Promise<UpdateResult>;
}
