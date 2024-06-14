import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user';
import { CreateUserDto, CreateUserDetailsDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserDetails } from '../interfaces/user';
import usersData from '../../data/user-collection.json';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class UserService {
  private readonly userData: UserDetails[] = usersData;
  private readonly dataFilePath = path.resolve(
    __dirname,
    'nest-api/data/user-collection.json',
  );

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    const dataDir = path.dirname(this.dataFilePath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
  }

  private getNextId(): number {
    return Math.max(...this.userData.map(({ id }) => id), 0) + 1;
  }

  private async saveUserDataToFile(): Promise<void> {
    try {
      const data = JSON.stringify(this.userData, null, 2);
      console.log('Data to write:', this.dataFilePath);
      fs.writeFileSync(this.dataFilePath, data, 'utf-8');
    } catch (error) {
      console.error('Error saving user data:', error);
      throw new Error('Could not save user data');
    }
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
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

  async validateUser(details: UserDetails): Promise<boolean> {
    const { email, password } = details;
    const user = await this.findUserByEmail(email);
    if (user) return bcrypt.compare(password, user.password);
    return false;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async fetchUserDetails(): Promise<UserDetails[]> {
    return this.userData;
  }

  async addUser(
    createUserDetailsDto: CreateUserDetailsDto,
  ): Promise<UserDetails> {
    const newUser: UserDetails = {
      id: this.getNextId(),
      ...createUserDetailsDto,
    };
    this.userData.push(newUser);

    await this.saveUserDataToFile();

    return newUser;
  }
}
