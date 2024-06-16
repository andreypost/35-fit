import { Injectable } from '@nestjs/common';
import { CreateUserDetailsDto } from './dto/create-user.dto';
import { IUserDetails } from '../interfaces/user';
import { join } from 'path';
import { readFileSync, writeFileSync } from 'fs';

@Injectable()
export class UserDetails {
  private userCollection: IUserDetails[] | null;
  private readonly filePath: string = join(
    process.cwd(),
    'data',
    'user-collection.json',
  );

  private loadUserCollection(): IUserDetails[] {
    try {
      this.userCollection = JSON.parse(readFileSync(this.filePath, 'utf8'));
    } catch (error) {
      this.userCollection = [];
    }
    return this.userCollection;
  }

  private saveUserDataToFile() {
    try {
      writeFileSync(
        this.filePath,
        JSON.stringify(this.userCollection, null, 2),
      );
    } catch (error) {
      throw new Error('Failed to save user data to file');
    }
  }

  public async addUserToJSON(
    createUserDetailsDto: CreateUserDetailsDto,
  ): Promise<IUserDetails> {
    const userCollection = this.loadUserCollection();
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

  public userCountByCounrty(): Record<string, number> {
    const userCollection = this.loadUserCollection();

    return userCollection.reduce(
      (acc, { country }) => {
        acc[country] = acc[country] ? ++acc[country] : 1;
        return acc;
      },
      {} as Record<string, number>,
    );
  }

  public statCountryEarnings(): Record<string, number> {
    const userCollection = this.loadUserCollection();
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
