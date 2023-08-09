import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumberString,
} from 'class-validator';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger'; // Import ApiProperty decorator
import { Book } from '../entity/book.entity';

export class IBook {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({ example: 'Sample Book' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'This is a sample book description.' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: '978-1234567890' })
  @IsString()
  @IsNotEmpty()
  isbn: string;
}

export class IBookUpdate {
  @ApiProperty({ example: 'Jane Smith' })
  @IsString()
  @IsOptional()
  author: string;

  @ApiProperty({ example: 'Updated Book Title' })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ example: 'Updated book description.' })
  @IsString()
  @IsOptional()
  description: string;
}

export class IGetBooks {
  @ApiProperty({ example: '10' })
  @IsNumberString()
  @IsNotEmpty()
  limit: string;

  @ApiProperty({ example: '1' })
  @IsNumberString()
  @IsNotEmpty()
  page: string;
}

export class IBookParam {
  @ApiProperty({ example: '1' })
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
