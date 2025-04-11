import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response, Request } from 'express';
import { User } from '../../../entities/user';
import { nextError } from '../../../utils/next.error';
import { JsonService } from '../json/json.service';
import { existsSync, mkdir, mkdirSync } from 'fs';
import path from 'path';

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
  public readonly csvReadFile = async (res: Response): Promise<any> => {
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
      if (!allUsers?.length) return;

      if (!existsSync(this.usersDataPath)) {
        mkdirSync(path.dirname(this.usersDataPath), { recursive: true });
      }

      return allUsers;
    } catch (error: any) {
      nextError;
    }
  };
}
