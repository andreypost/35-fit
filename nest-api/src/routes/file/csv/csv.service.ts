import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../entities/user';
import { nextError } from '../../../utils/next.error';
import { Repository } from 'typeorm';

@Injectable()
export class CsvService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  //   private readonly usersDataPath =
  public readonly csvReadFile = async (): Promise<any> => {
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
        ]);

      if (!allUsers) return;
      return allUsers;
    } catch (error: any) {
      nextError;
    }
  };
}
