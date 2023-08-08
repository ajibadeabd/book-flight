import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumberString,
} from 'class-validator';

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
