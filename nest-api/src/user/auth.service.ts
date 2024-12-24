import {
  Injectable,
  Inject,
  HttpStatus,
  UnauthorizedException,
  NotFoundException,
  ServiceUnavailableException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { config } from 'dotenv';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { Response, Request } from 'express';
import { User } from '../entities/user';
import { CreateUserDto, LoginUserDto } from './dto/create.user.dto';
import { msg } from '../constants/messages';
import { nextError } from '../helpers/next.error';
import { deleteAuthToken, validateAuthToken } from '../auth/validate.token';
import { secrets } from '../constants/secrets';

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

  public async findUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  private async setAuthToken(
    email: string,
    id: string,
    res: Response,
    keepLoggedIn: boolean = false,
  ): Promise<void> {
    try {
      const authToken = this.jwtService.sign({ email, id });
      res.cookie('authToken', authToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: keepLoggedIn ? secrets.LONG_EXPIRES_IN : secrets.EXPIRES_IN,
        // path: "/",
      });
    } catch (error: any) {
      console.error(error);
      throw new ServiceUnavailableException(msg.FAILED_TO_GENERATE_TOKEN);
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
      await deleteAuthToken(res);
      nextError(error);
    }
  }

  public async validateLoginUser(
    { email, password, keepLoggedIn }: LoginUserDto,
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

      await this.setAuthToken(email, user.id, res, keepLoggedIn);

      return res.status(HttpStatus.OK).json(user);
    } catch (error: any) {
      nextError(error);
    }
  }

  public async getAllUsers(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error: any) {
      nextError(error);
    }
  }

  public async validateUserByAuthToken(
    req: Request,
    res: Response,
  ): Promise<any> {
    try {
      const { authToken } = req?.cookies;
      const email = await validateAuthToken(authToken, res);

      const user = await this.findUserByEmail(email);
      if (!user) {
        await deleteAuthToken(res);
        throw new NotFoundException(msg.USER_NOT_FOUND);
      }
      return res.status(HttpStatus.OK).json(user);
    } catch (error: any) {
      nextError(error);
    }
  }

  public async logoutUser(
    deleteAccount: boolean,
    email: string,
    res: Response,
  ): Promise<any> {
    try {
      let repoResponse = null;
      if (deleteAccount) {
        repoResponse = await this.userRepository.delete({ email });
        if (!repoResponse?.affected) {
          return res.status(HttpStatus.NOT_FOUND).json({
            message: msg.USER_ALREADY_DELETED_OR_DOES_NOT_EXIST,
          });
        }
      }
      await deleteAuthToken(res);
      return res.status(HttpStatus.OK).json({
        message: repoResponse?.affected
          ? msg.USER_DELETED_SUCCESSFULLY
          : msg.LOGGED_OUT_SUCCESSFUL,
        success: true,
      });
    } catch (error: any) {
      nextError(error);
    }
  }
}
