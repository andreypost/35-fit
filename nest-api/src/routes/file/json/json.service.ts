import {
  Injectable,
  NotFoundException,
  // StreamableFile,
} from '@nestjs/common';
import { getFileData, writeFileData } from '../helpers/file.stream';
import { CreateUserJsonDto } from '../dto/create.user.json.dto';
import { resolveFilePath } from '../helpers/resolve.file.path';
import { nextError } from '../../../utils/next.error';
import { msg } from '../../../constants/messages';
import { countCountryEarnings } from '../helpers/user.collection';

@Injectable()
export class JsonService {
  private userCollectionPath = 'jsonData/user-collection.json';

  private userCollection: CreateUserJsonDto[] = [];
  private usersCountCache: Record<string, number> = {};
  private usersAverageEarningsCache: Record<string, number> = {};

  public async loadUserCollection(
    addToFile: boolean,
  ): Promise<CreateUserJsonDto[]> {
    try {
      if (!this.userCollection?.length) {
        for (let i = 0; i < 1_000; i++) {
        this.userCollection = await getFileData(
          resolveFilePath(this.userCollectionPath),
          addToFile,
        );
        }
        return this.userCollection;
      }
      return this.userCollection;
    } catch (error: any) {
      nextError(error);
    }
  }

  public async addNewDetailsUser(
    createUserDetailsDto: CreateUserJsonDto,
  ): Promise<any> {
    try {
      await this.loadUserCollection(true);

      // this.userCollection.push(CreateUserJsonDto); // Not thread-safe if multiple clients hit /write in parallel

      const newData = this.userCollection?.length
        ? [...this.userCollection, createUserDetailsDto]
        : [createUserDetailsDto];

      await writeFileData(resolveFilePath(this.userCollectionPath), newData);

      this.userCollection = [];
      this.usersCountCache = {};
      this.usersAverageEarningsCache = {};

      return {
        message: msg.FILE_WAS_WRITTEN_SUCCESSFULLY,
        ...createUserDetailsDto,
      };
    } catch (error: any) {
      return nextError(error);
    }
  }

  public async getUsersCountByCountry(): Promise<Record<string, number>> {
    try {
      await this.loadUserCollection(false);

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
      await this.loadUserCollection(false);

      if (Object.keys(this.usersAverageEarningsCache)?.length) {
        return this.usersAverageEarningsCache;
      }

      return (this.usersAverageEarningsCache = await countCountryEarnings(
        this.userCollection,
      ));
    } catch (error: any) {
      nextError(error);
    }
  }

  public async findUserById(id: number): Promise<CreateUserJsonDto> {
    try {
      await this.loadUserCollection(false);

      const user: CreateUserJsonDto = this.userCollection.find(
        (user) => user.id === id,
      );
      if (!user) throw new NotFoundException(`User with id ${id} not found.`);
      return user;
    } catch (error: any) {
      nextError(error);
    }
  }
}
