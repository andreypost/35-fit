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
import { Response, Request } from 'express';
import { User } from '../entities/user';
import {
  CreateUserDto,
  DeleteUserDto,
  LoginUserDto,
} from './dto/create-user.dto';
import { msg } from '../constants/messages';

config();

@Injectable()
export class AuthService {
  // private userDetailsData: UserDetails[];
  constructor(
    // @Inject('USER_DETAILS_REPOSITORY')
    // private readonly userDetailsRepository: Repository<UserDetails>,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  private async findUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  private async setAuthToken(
    email: string,
    id: string,
    res: Response,
  ): Promise<void> {
    try {
      const authToken = this.jwtService.sign({ email, id });
      res.cookie('authToken', authToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600000,
        // path: "/",
      });
    } catch (error: any) {
      console.error(error);
      throw new ServiceUnavailableException(msg.FAILED_TO_GENERATE_TOKEN);
    }
  }

  public async validateAuthToken(authToken: string): Promise<any> {
    if (!authToken) {
      throw new UnauthorizedException(msg.YOU_MUST_TO_LOGIN);
    }
    try {
      return this.jwtService.verify(authToken);
    } catch (error) {
      throw new UnauthorizedException(msg.INVALID_OR_EXPIRED_TOKEN);
    }
  }

  public async createNewUser(
    createUserDto: CreateUserDto,
    res: Response,
  ): Promise<any> {
    try {
      const existingUser = await this.findUserByEmail(createUserDto.email);
      if (existingUser) {
        throw new ConflictException(msg.EMAIL_ALREADY_EXIST);
      }

      let hashedPassword = '';
      try {
        hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      } catch {
        throw new InternalServerErrorException(msg.HASHING_PASS_OCCURRED);
      }

      await this.setAuthToken(createUserDto.email, hashedPassword, res);

      await this.userRepository.save({
        ...createUserDto,
        password: hashedPassword,
      });

      return res.status(HttpStatus.OK).json({
        message: msg.USER_CREATED_SUCCESSFULLY,
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
      throw new ServiceUnavailableException(msg.UNEXPECTED_ERROR);
    }
  }

  public async validateLoginUser(
    { email, password }: LoginUserDto,
    res: Response,
  ): Promise<any> {
    try {
      const user = await this.findUserByEmail(email);
      if (!user) {
        throw new NotFoundException(msg.USER_NOT_FOUND);
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new UnauthorizedException(msg.INVALID_CREDENTIALS);
      }

      await this.setAuthToken(email, user.id, res);

      return res.status(HttpStatus.OK).json(user);
    } catch (error: any) {
      console.error(error);
      if (error instanceof HttpException || error.message) {
        throw error;
      }
      throw new ServiceUnavailableException(msg.UNEXPECTED_ERROR);
    }
  }

  public async getAllUsers(req: Request): Promise<User[]> {
    try {
      const authToken = req?.cookies?.authToken;
      await this.validateAuthToken(authToken);

      return await this.userRepository.find();
    } catch (error: any) {
      console.error(error);
      if (error instanceof HttpException || error.message) {
        throw error;
      }
      throw new ServiceUnavailableException(msg.UNEXPECTED_ERROR);
    }
  }

  public async deleteUserByEmail(
    req: Request,
    deleteUserDto: DeleteUserDto,
    res: Response,
  ): Promise<any> {
    try {
      const authToken = req?.cookies?.authToken;
      await this.validateAuthToken(authToken);

      const { email } = deleteUserDto;
      const { affected } = await this.userRepository.delete({ email });
      if (affected) {
        return res.status(HttpStatus.OK).json({
          message: msg.USER_DELETED_SUCCESSFULLY,
        });
      } else {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: msg.USER_ALREADY_DELETED_OR_DOES_NOT_EXIST,
        });
      }
    } catch (error: any) {
      console.error(error);
      if (error instanceof HttpException || error.message) {
        throw error;
      }
      throw new ServiceUnavailableException(msg.UNEXPECTED_ERROR);
    }
  }
}
