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
import { Response } from 'express';
import { isDocker } from '../../utils/is.docker';
import { getFileData, writeFileData } from './helpers/file.stream';
import { CreateUserDetailsDto } from './dto/create.user.details.dto';
import { nextError } from '../../utils/next.error';
import { msg } from '../../constants/messages';
import { countCountryEarnings } from './helpers/user.collection';
// import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DetailService {
  private readonly filePath: string = (() => {
    const basePath = process.cwd();
    const jsonDataPath = 'jsonData/user-collection.json';

    if (process.platform === 'win32') {
      return join(basePath, '..', jsonDataPath); // Windows-specific path
    }

    if (isDocker) {
      return join(basePath, jsonDataPath); // Docker-specific path
    }

    if (process.platform === 'linux' || process.platform === 'darwin') {
      return join(basePath, '..', jsonDataPath); // POSIX-specific path for Linux and Mac
    }

    return join(basePath, jsonDataPath);
  })();
  /*     path.resolve(
    __dirname,
    process.platform === 'win32'
    ? '..\\..\\..\\..\\jsonData\\user-collection.json'
    : '../../../../jsonData/user-collection.json',
    ); */

  private userCollection: CreateUserDetailsDto[] = [];
  private usersCountCache: Record<string, number> = {};
  private averageEarningsCache: Record<string, number> = {};

  public async getStreamFile(): Promise<CreateUserDetailsDto[]> {
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
    createUserDetailsDto: CreateUserDetailsDto,
    res: Response,
  ): Promise<any> {
    try {
      await this.getStreamFile();
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
      this.userCollection = [];
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

  public async getUsersCountByCountry(): Promise<Record<string, number>> {
    try {
      await this.getStreamFile();
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

  public async getAverageEarningsByCountry(): Promise<Record<string, number>> {
    try {
      await this.getStreamFile();
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

  public async findUserById(id: string): Promise<CreateUserDetailsDto> {
    try {
      await this.getStreamFile();
      // await this.loadUserCollection(req);
      const user: CreateUserDetailsDto = this.userCollection.find(
        (user) => user.id.toString() === id,
      );
      if (!user) throw new NotFoundException(`User with id ${id} not found.`);
      return user;
    } catch (error: any) {
      nextError(error);
    }
  }
}
