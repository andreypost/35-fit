import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDetailsDto } from './dto/create-user.dto';
import { IUserDetails } from '../interfaces/user';
import { join } from 'path';
import { readFile, writeFile } from 'fs/promises';

@Injectable()
export class UserDetailsJsonService {
  private userCollection: IUserDetails[] | null;
  private readonly filePath: string = join(
    process.cwd(),
    'data',
    'user-collection.json',
  );

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
    const userCollection = await this.loadUserCollection();

    return userCollection.reduce(
      (acc, { country }) => {
        acc[country] = acc[country] ? ++acc[country] : 1;
        return acc;
      },
      {} as Record<string, number>,
    );
  }

  public async getAverageEarningsByCountry(): Promise<Record<string, number>> {
    const userCollection = await this.loadUserCollection();
    interface CountryEarnings {
      total: number;
      count: number;
    }

    const countryEarnings: Record<string, CountryEarnings> =
      userCollection.reduce(
        (acc: Record<string, CountryEarnings>, { country, earnings }) => {
          const formattedEarns = parseFloat(earnings.replace(/[$]/g, ''));
          if (!acc[country]) {
            acc[country] = { total: formattedEarns, count: 1 };
          } else if (acc[country].count < 10) {
            acc[country].total += formattedEarns;
            acc[country].count += 1;
          }
          return acc;
        },
        {},
      );

    const averageEarnings: Record<string, number> = {};
    for (const [country, { total, count }] of Object.entries(countryEarnings)) {
      averageEarnings[country] = Math.round(total / count);
    }
    return averageEarnings;
  }
}
