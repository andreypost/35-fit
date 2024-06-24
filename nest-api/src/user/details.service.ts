import { Injectable, InternalServerErrorException, Res } from '@nestjs/common';
import { CreateUserDetailsDto } from './dto/create-user.dto';
import { IUserDetails } from '../interfaces/user';
import { join } from 'path';
import { readFile, writeFile } from 'fs/promises';
import { createReadStream } from 'fs';

@Injectable()
export class DetailsService {
  private userCollection: IUserDetails[] = null;
  private readonly filePath: string = join(
    process.cwd(),
    'data',
    'user-collection.json',
  );
  private userCountCache: Record<string, number> = null;
  private averageEarningsCache: Record<string, number> = {};

  private async loadUserCollection(): Promise<IUserDetails[]> {
    if (this.userCollection?.length) return this.userCollection;
    try {
      return (this.userCollection = JSON.parse(
        await readFile(this.filePath, 'utf8'),
      ));
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to load user data from "./user-collection.json" file',
      );
    }
  }

  public async getUserDetails(res: any): Promise<IUserDetails[]> {
    try {
      const file = createReadStream(this.filePath);
      return file.pipe(res);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to load user data from "./user-collection.json" file',
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
      this.userCountCache = null;
      this.averageEarningsCache = {};
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to save user data to "./user-collection.json" file',
      );
    }
  }

  public async getUserCountByCountry(): Promise<Record<string, number>> {
    if (this.userCountCache?.length) return this.userCountCache;

    await this.loadUserCollection();
    this.userCountCache = this.userCollection.reduce(
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

    await this.loadUserCollection();
    const countryEarnings: Record<string, number[]> =
      this.userCollection.reduce(
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
