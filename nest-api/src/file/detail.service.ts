import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { Request, Response } from 'express';
import { UserDetails } from '../entities/user.details';
import { CreateUserDetailsDto } from '../user/dto/create-user-details.dto';
// import { v4 as uuidv4 } from 'uuid';
import { countCountryEarnings } from '../helpers/user.collection';
import { existsSync } from 'fs';
import { msg } from '../constants/messages';
import { nextError } from '../helpers/next.error';
import { validateAuthToken } from '../utils/validate.token';

@Injectable()
export class DetailService {
  private userCollection: UserDetails[] = null;
  /*   private readonly filePath: string = path.join(
    process.cwd(),
    'data',
    'user-collection.json',
  ); */

  private readonly filePath: string = path.resolve(
    __dirname,
    '../../../../jsonData/user-collection.json',
  );

  private usersCountCache: Record<string, number> = {};
  private averageEarningsCache: Record<string, number> = {};

  public async loadUserCollection(req: Request): Promise<UserDetails[]> {
    try {
      const authToken = req?.cookies?.authToken;
      await validateAuthToken(authToken);
      // if (this.userCollection) return this.userCollection;
      if (!existsSync(this.filePath)) {
        throw new InternalServerErrorException(
          this.filePath,
          msg.FILE_DOES_NOT_EXIST,
        );
      }
      return (this.userCollection = JSON.parse(
        await readFile(this.filePath, 'utf8'),
      ));
    } catch (error: any) {
      nextError(error);
      // throw error;
    }
  }

  public async addNewDetailsUser(
    req: Request,
    createUserDetailsDto: CreateUserDetailsDto,
    res: Response,
  ): Promise<any> {
    try {
      await this.loadUserCollection(req);
      this.userCollection.push(createUserDetailsDto);
      // const id: string = uuidv4();
      // const newUser: UserDetails = {
      //   id,
      //   ...createUserDetailsDto,
      // };
      await writeFile(
        this.filePath,
        JSON.stringify(this.userCollection, null, 2),
      );
      this.usersCountCache = {};
      this.averageEarningsCache = {};
      return res.status(HttpStatus.OK).json({
        message: msg.FILE_WAS_WRITTEN_SUCCESSFULLY,
        ...createUserDetailsDto,
      });
    } catch (error: any) {
      nextError(error);
    }
  }

  public async getUsersCountByCountry(
    req: Request,
  ): Promise<Record<string, number>> {
    try {
      await this.loadUserCollection(req);
      if (Object.keys(this.usersCountCache)?.length)
        return this.usersCountCache;
      return (this.usersCountCache = this.userCollection.reduce(
        (acc, { country }) => {
          !acc[country] ? (acc[country] = 1) : ++acc[country];
          return acc;
        },
        {} as Record<string, number>,
      ));
    } catch (error: any) {
      nextError(error);
    }
  }

  public async getAverageEarningsByCountry(
    req: Request,
  ): Promise<Record<string, number>> {
    try {
      await this.loadUserCollection(req);
      if (Object.keys(this.averageEarningsCache)?.length)
        return this.averageEarningsCache;

      return (this.averageEarningsCache = countCountryEarnings(
        this.userCollection,
      ));
    } catch (error: any) {
      nextError(error);
    }
  }

  public async findUserById(req: Request, id: string): Promise<UserDetails> {
    try {
      await this.loadUserCollection(req);
      const user: UserDetails = this.userCollection.find(
        (user) => user.id == id,
      );
      if (!user) throw new NotFoundException(`User with id ${id} not found.`);
      return user;
    } catch (error: any) {
      nextError(error);
    }
  }
}
