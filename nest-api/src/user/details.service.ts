import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { join } from 'path';
import { readFile, writeFile } from 'fs/promises';
import { createReadStream } from 'fs';
import { IUserDetails } from 'src/interfaces/user';
import { CreateUserDetailsDto } from './dto/create-user.dto';

@Injectable()
export class DetailsService {
  private userCollection: IUserDetails[] = null;
  private readonly filePath: string = join(
    process.cwd(),
    'data',
    'user-collection.json',
  );
  private usersCountCache: Record<string, number> = null;
  private averageEarningsCache: Record<string, number> = {};

  private async loadUserCollection(): Promise<IUserDetails[]> {
    if (this.userCollection?.length) return this.userCollection;
    try {
      return (this.userCollection = JSON.parse(
        await readFile(this.filePath, 'utf8'),
      ));
    } catch {
      throw new InternalServerErrorException(
        'Failed to load data from "user-collection.json" file',
      );
    }
  }

  public async getUserDetails(res: any): Promise<IUserDetails[]> {
    try {
      return createReadStream(this.filePath).pipe(res);
    } catch {
      throw new InternalServerErrorException(
        'Failed to load data from "user-collection.json" file',
      );
    }
  }

  public async addNewUser(
    createUserDetailsDto: CreateUserDetailsDto,
  ): Promise<void> {
    await this.loadUserCollection();
    const id = Math.max(...this.userCollection.map(({ id }) => id), 0) + 1;
    const newUser: IUserDetails = {
      id: id,
      ...createUserDetailsDto,
    };
    this.userCollection.push(newUser);
    try {
      await writeFile(
        this.filePath,
        JSON.stringify(this.userCollection, null, 2),
      );
      this.usersCountCache = null;
      this.averageEarningsCache = {};
    } catch {
      throw new InternalServerErrorException(
        'Failed to save data to "user-collection.json" file',
      );
    }
  }

  public async getUsersCountByCountry(): Promise<Record<string, number>> {
    if (this.usersCountCache?.length) return this.usersCountCache;

    await this.loadUserCollection();
    return (this.usersCountCache = this.userCollection.reduce(
      (acc, { country }) => {
        acc[country] = acc[country] ? ++acc[country] : 1;
        return acc;
      },
      {} as Record<string, number>,
    ));
  }

  public async getAverageEarnsByCountry(): Promise<Record<string, number>> {
    if (Object.keys(this.averageEarningsCache)?.length)
      return this.averageEarningsCache;

    await this.loadUserCollection();
    const countryEarnings = this.userCollection.reduce(
      (acc, { country, earnings }) => {
        const formattedEarns = parseFloat(earnings.replace(/[$]/g, ''));
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

  public async findOneById(id: number): Promise<string> {
    await this.loadUserCollection();
    const user = this.userCollection.find((user) => user.id === +id);
    return user ? user.name : `User with id ${id} not found.`;
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
