import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user';
import { CreateUserDto, CreateUserDetailsDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserDetails } from '../interfaces/user';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { readFileSync } from 'fs';

@Injectable()
export class UserService {
  private userCollection: UserDetails[];
  private filePath: string = join(
    process.cwd(),
    'data',
    'user-collection.json',
  );
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    this.userCollection = JSON.parse(readFileSync(this.filePath, 'utf8'));
  }

  private async saveUserDataToFile() {
    await writeFile(
      this.filePath,
      JSON.stringify(this.userCollection, null, 2),
    );
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

  async addUser(
    createUserDetailsDto: CreateUserDetailsDto,
  ): Promise<UserDetails> {
    const id = Math.max(...this.userCollection.map(({ id }) => id), 0) + 1;
    const newUser: UserDetails = {
      id: id,
      ...createUserDetailsDto,
    };
    this.userCollection.push(newUser);
    await this.saveUserDataToFile();
    return newUser;
  }
}
