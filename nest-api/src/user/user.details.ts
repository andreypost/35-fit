import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDetailsDto } from './dto/create-user.dto';
import { IUserDetails } from '../interfaces/user';
import { join } from 'path';
import { readFile, writeFile } from 'fs/promises';

@Injectable()
export class UserDetails {
  private userCollection: IUserDetails[] | null;
  private readonly filePath: string = join(
    process.cwd(),
    'data',
    'user-collection.json',
  );
  private userCountCache: Record<string, number> | null = null;
  private averageEarningsCache: Record<string, number> = {};

  private async loadUserCollection(): Promise<IUserDetails[]> {
    try {
      const fileContent = await readFile(this.filePath, 'utf8');
      this.userCollection = JSON.parse(fileContent);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to load user data from "./user-collection.json" file',
      );
    }
    return this.userCollection;
  }

  private async saveUserDataToFile(): Promise<void> {
    try {
      await writeFile(
        this.filePath,
        JSON.stringify(this.userCollection, null, 2),
      );
      this.userCountCache = null;
      this.averageEarningsCache = {};
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to save user data to "./user-collection.json" file',
      );
    }
  }

  public async addNewUser(
    createUserDetailsDto: CreateUserDetailsDto,
  ): Promise<IUserDetails> {
    const userCollection = await this.loadUserCollection();
    const id = Math.max(...userCollection.map(({ id }) => id), 0) + 1;
    const newUser: IUserDetails = {
      id: id,
      ...createUserDetailsDto,
    };
    userCollection.push(newUser);
    this.saveUserDataToFile();
    return newUser;
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

  public async getUserCountByCountry(): Promise<Record<string, number>> {
    if (this.userCountCache) return this.userCountCache;

    const userCollection = await this.loadUserCollection();

    this.userCountCache = userCollection.reduce(
      (acc, { country }) => {
        acc[country] = acc[country] ? ++acc[country] : 1;
        return acc;
      },
      {} as Record<string, number>,
    );
    return this.userCountCache;
  }

  public async getAverageEarnsByCountry(): Promise<Record<string, number>> {
    if (Object.keys(this.averageEarningsCache).length)
      return this.averageEarningsCache;

    const userCollection = await this.loadUserCollection();

    const countryEarnings: Record<string, number[]> = userCollection.reduce(
      (acc: Record<string, number[]>, { country, earnings }) => {
        const formattedEarns = parseFloat(earnings.replace(/[$]/g, ''));
        !acc[country]
          ? (acc[country] = [formattedEarns])
          : acc[country].push(formattedEarns);
        return acc;
      },
      {},
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
}
