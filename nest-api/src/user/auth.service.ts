import {
  Injectable,
  Inject,
  HttpStatus,
  UnauthorizedException,
  NotFoundException,
  ServiceUnavailableException,
  ConflictException,
  InternalServerErrorException,
  HttpException,
} from '@nestjs/common';
import { config } from 'dotenv';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { Response } from 'express';
import { UserDetails } from '../entities/user.details';
import { User } from '../entities/user';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { CreateUserDetailsDto } from './dto/create-user-details.dto';
import { countCountryEarnings } from '../helpers/user.collection';

config();

@Injectable()
export class AuthService {
  private userDetailsData: UserDetails[];
  constructor(
    @Inject('USER_DETAILS_REPOSITORY')
    private readonly userDetailsRepository: Repository<UserDetails>,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  private async findUserByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }

  private async setAuthToken(
    email: string,
    userId: string,
    res: Response,
  ): Promise<void> {
    try {
      const authToken = this.jwtService.sign({ email, id: userId });
      res.cookie('authToken', authToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600000,
        // path: "/",
      });
    } catch {
      throw new ServiceUnavailableException(
        'Unable to generate and set authToken to cookie!',
      );
    }
  }

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

  public async validateUser(
    { email, password }: LoginUserDto,
    res: Response,
  ): Promise<any> {
    try {
      const user = await this.findUserByEmail(email);
      if (!user) {
        throw new NotFoundException('User not found!');
      }

      try {
        await bcrypt.compare(password, user.password);
      } catch {
        throw new UnauthorizedException('Password is inalid!');
      }

      await this.setAuthToken(email, user.id, res);

      return res.status(HttpStatus.OK).json({
        message:
          'User is validated and auth token generated and set successfully!',
      });
    } catch (error: any) {
      console.error(error);
      if (error instanceof HttpException || error.message) {
        throw error;
      }
      throw new ServiceUnavailableException('An unexpected error occurred!');
    }
  }

  public async createUser(
    createUserDto: CreateUserDto,
    res: Response,
  ): Promise<any> {
    try {
      const existingUser = await this.findUserByEmail(createUserDto.email);
      if (existingUser) {
        throw new ConflictException('Email already exists!');
      }

      let hashedPassword = '';
      try {
        hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      } catch {
        throw new InternalServerErrorException(
          'Error occurred while hashing the password',
        );
      }

      await this.setAuthToken(createUserDto.email, hashedPassword, res);

      await this.userRepository.save({
        ...createUserDto,
        password: hashedPassword,
      });

      return res.status(HttpStatus.OK).json({
        message: 'User was added successfully!',
      });
    } catch (error: any) {
      console.error(error);

      res.clearCookie('authToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      if (error instanceof HttpException || error.message) {
        throw error;
      }
      throw new ServiceUnavailableException('Something went wrong!');
    }
  }

  public async getAverageEarningsByCountry(): Promise<Record<string, number>> {
    await this.findAllUserDetails();
    return countCountryEarnings(this.userDetailsData);
  }
}

/*
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserDetails } from '../entities/user';
import { CreateUserDetailsDto, CreateUserDto } from './dto/create-user.dto';
import { IUserDetails } from '../interfaces/user';

@Injectable()
export class AuthService {
  private userDetailsData: UserDetails[];
  constructor(
    @InjectRepository(UserDetails)
    private readonly userDetailsRepository: Repository<UserDetails>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

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

  public async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async findUserByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }

  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = this.userRepository.create({
      email: createUserDto.email,
      password: hashedPassword,
    });
    return await this.userRepository.save(newUser);
  }

  public async validateUser(details: IUserDetails): Promise<boolean> {
    const { email, password } = details;
    const user = await this.findUserByEmail(email);
    if (user) {
      return bcrypt.compare(password, user.password);
    }
    return false;
  }
}
 */
