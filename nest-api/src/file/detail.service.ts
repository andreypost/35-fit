import {
  HttpStatus,
  Injectable,
  NotFoundException,
  // StreamableFile,
} from '@nestjs/common';
import {
  join,
  // resolve
} from 'path';
// import { existsSync } from 'fs';
// import { readFile, writeFile } from 'fs/promises';
import { Request, Response } from 'express';
import { getFileData, writeFileData } from 'src/helpers/fileStream';
import { validateAuthToken } from '../utils/validate.token';
import { UserDetails } from '../entities/user.details';
import { CreateUserDetailsDto } from '../user/dto/create-user-details.dto';
// import { v4 as uuidv4 } from 'uuid';
import { countCountryEarnings } from '../helpers/user.collection';
import { msg } from '../constants/messages';
import { nextError } from '../helpers/next.error';

@Injectable()
export class DetailService {
  private userCollection: UserDetails[] = null;

  private readonly filePath: string = join(
    process.cwd(),
    process.platform === 'win32'
      ? '..\\jsonData\\user-collection.json' // Windows-specific path
      : '../jsonData/user-collection.json', // POSIX-specific path
  );
  /*     path.resolve(
    __dirname,
    process.platform === 'win32'
      ? '..\\..\\..\\..\\jsonData\\user-collection.json'
      : '../../../../jsonData/user-collection.json',
  ); */

  private usersCountCache: Record<string, number> = {};
  private averageEarningsCache: Record<string, number> = {};

  public async getStreamFile(req: Request): Promise<UserDetails[]> {
    try {
      if (!this.userCollection?.length) {
        return (this.userCollection = await getFileData(this.filePath));
      }
      return this.userCollection;
    } catch (error: any) {
      nextError(error);
    }
  }

  /*   public async loadUserCollection(req: Request): Promise<UserDetails[]> {
    try {
      const authToken = req?.cookies?.authToken;
      await validateAuthToken(authToken);
      if (this.userCollection) return this.userCollection;
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
  } */

  public async addNewDetailsUser(
    req: Request,
    createUserDetailsDto: CreateUserDetailsDto,
    res: Response,
  ): Promise<any> {
    try {
      await this.getStreamFile(req);
      // await this.loadUserCollection(req);
      this.userCollection.push(createUserDetailsDto);
      // const id: string = uuidv4();
      // const newUser: UserDetails = {
      //   id,
      //   ...createUserDetailsDto,
      // };
      await writeFileData(this.filePath, this.userCollection);
      // await writeFile(
      //   this.filePath,
      //   JSON.stringify(this.userCollection, null, 2),
      // );
      this.userCollection = null;
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
      await this.getStreamFile(req);
      // await this.loadUserCollection(req);
      if (Object.keys(this.usersCountCache)?.length) {
        return this.usersCountCache;
      }
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
      await this.getStreamFile(req);
      // await this.loadUserCollection(req);
      if (Object.keys(this.averageEarningsCache)?.length) {
        return this.averageEarningsCache;
      }

      return (this.averageEarningsCache = await countCountryEarnings(
        this.userCollection,
      ));
    } catch (error: any) {
      nextError(error);
    }
  }

  public async findUserById(req: Request, id: string): Promise<UserDetails> {
    try {
      await this.getStreamFile(req);
      // await this.loadUserCollection(req);
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
