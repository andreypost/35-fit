import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from 'express';
import { Readable } from 'stream';
import { existsSync, mkdir, mkdirSync } from 'fs';
import path from 'path';
import { format } from 'fast-csv';
import { User } from '../../../entities/user';
import { nextError } from '../../../utils/next.error';
import { JsonService } from '../json/json.service';
import { msg } from '../../../constants/messages';

@Injectable()
export class CsvService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jsonService: JsonService,
  ) {}
  private readonly usersDataPath = this.jsonService.resolveFilePath(
    'csvData/users-data.csv',
  );
  public readonly csvReadFile = async (res: Response): Promise<Readable> => {
    try {
      const allUsers = await this.userRepository
        .createQueryBuilder('user')
        .select([
          'user.name AS name',
          'user.surname AS surname',
          'user.gender AS gender',
          'user.age AS age',
          'user.country AS country',
          'user.city AS city',
          'user.email AS email',
          'user.phone AS phone',
        ])
        .getRawMany();

      if (!allUsers?.length) {
        throw new NotFoundException(msg.FILE_DOES_NOT_EXIST);
      }
      // <-- 00 without saving csv file to disk
      const csvStream = format({ headers: true });
      allUsers.forEach((user) => csvStream.write(user));
      csvStream.end();
      // <-- 00 end

      // <-- 01 with saving csv file to disk
      // if (!existsSync(this.usersDataPath)) {
      //   mkdirSync(path.dirname(this.usersDataPath), { recursive: true });
      // }

      // csvStream.pipe(res).on('finish', () => {
      //   console.log('CSV streamed successfully to client');
      // });
      // <-- 01 end

      return csvStream;
    } catch (error: any) {
      return nextError(error);
    }
  };
}
