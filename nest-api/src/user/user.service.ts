import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserDetails } from 'src/interfaces/user-detais.interface';
import usersData from '../../data/user-collection.json';

@Injectable()
export class UserService {
  private readonly userData: UserDetails[] = usersData;
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

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

  async validateUser(email: string, password: string): Promise<boolean> {
    const user = await this.findUserByEmail(email);
    if (user) return bcrypt.compare(password, user.password);
    return false;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async fetchUserDetails(): Promise<UserDetails[] | null> {
    return this.userData;
  }
}
