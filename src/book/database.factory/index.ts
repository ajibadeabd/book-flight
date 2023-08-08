import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Book } from '../entity/book.entity';
import { IBook, IBookUpdate, IGetBooks } from '../types';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private usersRepository: Repository<Book>,
  ) {}

  findAll(bookParams: IGetBooks): Promise<Book[]> {
    const { limit, page } = bookParams;
    const skip = (+page - 1) * +limit;
    return this.usersRepository.find({ skip, take: +limit });
  }

  findOne(id: number): Promise<Book | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }

  async create(data: IBook): Promise<Book> {
    return this.usersRepository.save(data);
  }

  async update(data: IBookUpdate, bookId: number): Promise<UpdateResult> {
    return this.usersRepository.update({ id: bookId }, data);
  }
}
