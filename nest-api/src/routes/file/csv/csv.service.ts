import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from 'express';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import path from 'path';
import { format } from 'fast-csv';
import { User } from '../../../entities/user';
import { handleError } from '../../../utils/handle.error';
import { msg } from '../../../constants/messages';
import { CsvUser } from '../dto/create.user.json.dto';
import { resolveFilePath } from '../helpers/resolve.file.path';

@Injectable()
export class CsvService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  private readonly usersDataPath = resolveFilePath('csvData/users-data.csv');
  public readonly csvReadWriteFile = async (
    res: Response,
    saveToDisk: boolean = false,
  ): Promise<void> => {
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

      const transform = (row: CsvUser): CsvUser => ({
        name: row.name.toUpperCase(),
        surname: row.surname.toUpperCase(),
        gender: row.gender.toUpperCase(),
        age: row.age,
        country: row.country,
        city: row.city,
        email: row.email,
        phone: row.phone,
      });

      const csvStream = format({ headers: true, transform });

      if (saveToDisk) {
        if (!existsSync(this.usersDataPath)) {
          mkdirSync(path.dirname(this.usersDataPath), { recursive: true });
        }

        const writable = createWriteStream(this.usersDataPath, {
          encoding: 'utf-8',
          flags: 'w',
        });

        csvStream.pipe(writable);
        for (let i = 0; i < 1_000_000; i++) {
          allUsers.forEach((user) => csvStream.write(user));
        }
        csvStream.end();

        await new Promise<void>((res, rej) => {
          writable.on('finish', res);
          writable.on('error', rej);
        });

        res.setHeader('Content-Type', 'text/csv');
        return res.download(this.usersDataPath, 'user-data.csv');
      } else {
        res.setHeader(
          'Content-Disposition',
          'attachment; filename="users-data.csv"',
        );
        res.setHeader('Content-Type', 'text/csv');

        csvStream.pipe(res).on('finish', () =>
          // Trigger something after the stream completes (like clean-up, closing connections)
          console.log('CSV stream to client'),
        );

        allUsers.forEach((user) => csvStream.write(user));

        csvStream.end();

        return;
      }
    } catch (error: unknown) {
      return handleError(error);
    }
  };
}
