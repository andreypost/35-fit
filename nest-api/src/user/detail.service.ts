import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { join } from 'path';
import { readFile, writeFile } from 'fs/promises';
import { IUserDetails } from 'src/interfaces/user';
import { CreateUserDetailsDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DetailService {
  private userCollection: IUserDetails[] = null;
  private readonly filePath: string = join(
    process.cwd(),
    'data',
    'user-collection.json',
  );
  private usersCountCache: Record<string, number> = {};
  private averageEarningsCache: Record<string, number> = {};

  public async loadUserCollection(): Promise<IUserDetails[]> {
    if (this.userCollection) return this.userCollection;
    try {
      return (this.userCollection = JSON.parse(
        await readFile(this.filePath, 'utf8'),
      ).map((user) => ({ ...user, id: user.id.toString() })));
    } catch {
      throw new InternalServerErrorException(
        'Failed to load data from "user-collection.json" file',
      );
    }
  }

  public async addNewUser(
    createUserDetailsDto: CreateUserDetailsDto,
  ): Promise<IUserDetails> {
    await this.loadUserCollection();
    const id: string = uuidv4();
    const newUser: IUserDetails = { id, ...createUserDetailsDto };
    this.userCollection.push(newUser);
    try {
      await writeFile(
        this.filePath,
        JSON.stringify(this.userCollection, null, 2),
      );
      this.usersCountCache = {};
      this.averageEarningsCache = {};
    } catch {
      throw new InternalServerErrorException(
        'Failed to save data to "user-collection.json" file',
      );
    }
    return newUser;
  }

  public async getUsersCountByCountry(): Promise<Record<string, number>> {
    if (Object.keys(this.usersCountCache)?.length) return this.usersCountCache;

    await this.loadUserCollection();
    return (this.usersCountCache = this.userCollection.reduce(
      (acc, { country }) => {
        acc[country] ? ++acc[country] : (acc[country] = 1);
        return acc;
      },
      {} as Record<string, number>,
    ));
  }

  public async getAverageEarningsByCountry(): Promise<Record<string, number>> {
    if (Object.keys(this.averageEarningsCache)?.length)
      return this.averageEarningsCache;

    await this.loadUserCollection();
    const countryEarnings = this.userCollection.reduce(
      (acc, { country, earnings }) => {
        const formattedEarns = parseFloat(earnings.replace(/[$]/, ''));
        !acc[country]
          ? (acc[country] = [formattedEarns])
          : acc[country].push(formattedEarns);
        return acc;
      },
      {} as Record<string, number[]>,
    );

    for (const country in countryEarnings) {
      const topEarnings = countryEarnings[country]
        .sort((a, b) => b - a)
        .slice(0, 10);
      const total = topEarnings.reduce((sum, earn) => sum + earn, 0);
      this.averageEarningsCache[country] = Math.round(
        total / topEarnings.length,
      );
    }
    return this.averageEarningsCache;
  }

  public async findOneById(id: string): Promise<IUserDetails | string> {
    await this.loadUserCollection();
    const user = this.userCollection.find((user) => user.id === id);
    return user ? user : `User with id ${id} not found.`;
  }

  // public async getUserCountByCounrtyDB(): Promise<Record<string, number>> {
  //   const result = await this.userRepository
  //     .createQueryBuilder('user')
  //     .select('user.country', 'country')
  //     .addSelect('COUNT(user.id)', 'count')
  //     .groupBy('user.country')
  //     .getRawMany();

  //   return result.reduce(
  //     (acc, { country, count }) => {
  //       acc[country] = parseInt(count, 10);
  //       return acc;
  //     },
  //     {} as Record<string, number>,
  //   );
  // }
}
