import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user';
import { CreateUserDto, CreateUserDetailsDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserDetails } from '../interfaces/user';
import { join } from 'path';
import { readFileSync, writeFileSync } from 'fs';

@Injectable()
export class UserService {
  private userCollection: UserDetails[] | null;
  private readonly filePath: string = join(
    process.cwd(),
    'data',
    'user-collection.json',
  );

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  private loadUserCollection(): UserDetails[] {
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

  public async findUserByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = this.userRepository.create({
      email: createUserDto.email,
      password: hashedPassword,
    });
    return this.userRepository.save(newUser);
  }

  public async validateUser(details: UserDetails): Promise<boolean> {
    const { email, password } = details;
    const user = await this.findUserByEmail(email);
    if (user) {
      return bcrypt.compare(password, user.password);
    }
    return false;
  }

  public async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  public async addUserToJSON(
    createUserDetailsDto: CreateUserDetailsDto,
  ): Promise<UserDetails> {
    const userCollection = this.loadUserCollection();
    const id = Math.max(...userCollection.map(({ id }) => id), 0) + 1;
    const newUser: UserDetails = {
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

  public getUserCountByCounrty(): Record<string, number> {
    const userCollection = this.loadUserCollection();

    return userCollection.reduce(
      (acc, { country }) => {
        acc[country] = acc[country] ? ++acc[country] : 1;
        return acc;
      },
      {} as Record<string, number>,
    );
  }
}
