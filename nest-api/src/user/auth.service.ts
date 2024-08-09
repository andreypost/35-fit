import { Injectable, Inject } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserDetails } from '../entities/user';
import { CreateUserDetailsDto, CreateUserDto } from './dto/create-user.dto';
import { IUserDetails } from '../interfaces/user';

// @Inject('USER_REPOSITORY')
// @Inject('USER_DETAILS_REPOSITORY')
@Injectable()
export class AuthService {
  private userDetailsData: UserDetails[];
  constructor(
    @Inject('USER_DETAILS_REPOSITORY')
    private readonly userDetailsRepository: Repository<UserDetails>,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  // constructor(
  //   @InjectRepository(UserDetails)
  //   private readonly userDetailsRepository: Repository<UserDetails>,
  //   @InjectRepository(User) private userRepository: Repository<User>,
  // ) {}

  public async findAllUserDetails(): Promise<UserDetails[]> {
    return (this.userDetailsData = await this.userDetailsRepository.find());
  }

  public async addNewUserDetails(
    createUserDetailsDto: CreateUserDetailsDto,
  ): Promise<UserDetails> {
    const newUserDetails =
      this.userDetailsRepository.create(createUserDetailsDto);
    return this.userDetailsRepository.save(newUserDetails);
  }

  public async getUserCountByCountryDetails(): Promise<Record<string, number>> {
    await this.findAllUserDetails();

    return this.userDetailsData.reduce(
      (acc, { country }) => {
        !acc[country] ? (acc[country] = 1) : ++acc[country];
        return acc;
      },
      {} as Record<string, number>,
    );
  }

  public async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async findUserByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }

  public async validateUser(details: IUserDetails): Promise<boolean> {
    const { email, password } = details;
    const user = await this.findUserByEmail(email);
    if (user) {
      return bcrypt.compare(password, user.password);
    }
    return false;
  }

  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = this.userRepository.create({
      name: createUserDto.name,
      age: createUserDto.age,
      email: createUserDto.email,
      password: hashedPassword,
    });
    return await this.userRepository.save(newUser);
  }
}
