import {
  Injectable,
  HttpStatus,
  UnauthorizedException,
  NotFoundException,
  ServiceUnavailableException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import bcrypt from 'bcrypt';
import { config } from 'dotenv';
import { User } from '../../entities/user';
import { CreateUserDto, LoginUserDto } from './dto/create.user.dto';
import { msg } from '../../constants/messages';
import { nextError } from '../../utils/next.error';
import { deleteAuthToken, validateAuthToken } from '../../guards/auth.token';
import { secrets } from '../../constants/secrets';
import { UserPrivileges } from '../../utils/user.roles';

config();

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
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
  ): Promise<User> {
    try {
      const { email, password } = createUserDto;

      const existingUser = await this.findUserByEmail(email);
      if (existingUser) {
        throw new ConflictException(msg.EMAIL_ALREADY_EXIST);
      }

      let hashedPassword = '';
      try {
        hashedPassword = await bcrypt.hash(password, 10);
      } catch {
        throw new InternalServerErrorException(msg.HASHING_PASS_OCCURRED);
      }

      await this.setAuthToken(email, hashedPassword, res);

      const userRoles = UserPrivileges.isAdminEmail(email)
        ? UserPrivileges.Administrator
        : UserPrivileges.ProjectCreator;

      return await this.userRepository.save({
        ...createUserDto,
        password: hashedPassword,
        grantedPrivileges: userRoles,
        deniedPrivileges: UserPrivileges.None,
      });
    } catch (error: any) {
      await deleteAuthToken(res);
      nextError(error);
    }
  }

  public async loginUser(
    { email, password, keepLoggedIn }: LoginUserDto,
    res: Response,
  ): Promise<User> {
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

      return user;
    } catch (error: any) {
      nextError(error);
    }
  }

  public async validateUserByAuthToken(
    req: Request,
    res: Response,
  ): Promise<User> {
    try {
      const { authToken } = req?.cookies;
      if (!authToken) return;

      const email = await validateAuthToken(authToken, res);

      const user = await this.findUserByEmail(email);
      if (!user) {
        await deleteAuthToken(res);
        throw new NotFoundException(msg.USER_NOT_FOUND);
      }
      return user;
    } catch (error: any) {
      nextError(error);
    }
  }

  public async getAllUsers(): Promise<User[]> {
    try {
      return await this.userRepository.find();
      //   {
      //   take: 5,
      //   order: { createdAt: 'DESC' },
      // }
    } catch (error: any) {
      nextError(error);
    }
  }

  public async logoutUser(
    deleteAccount: boolean,
    email: string,
    res: Response,
  ): Promise<{ message: string }> {
    try {
      let repoResponse = null;
      if (deleteAccount) {
        repoResponse = await this.userRepository.delete({ email });
        if (!repoResponse?.affected) {
          return {
            message: msg.USER_ALREADY_DELETED_OR_DOES_NOT_EXIST,
          };
        }
      }
      await deleteAuthToken(res);
      return {
        message: repoResponse?.affected
          ? msg.USER_DELETED_SUCCESSFULLY
          : msg.LOGGED_OUT_SUCCESSFUL,
      };
    } catch (error: any) {
      if (error.code === '23503') {
        return {
          message: msg.USER_CANNOT_BE_DELETED,
        };
      }
      nextError(error);
    }
  }

  public async updateUserPrivileges(
    id: string,
    grantedPrivileges: number,
    deniedPrivileges: number,
  ): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException(msg.USER_NOT_FOUND);
      }

      user.grantedPrivileges = grantedPrivileges;
      user.deniedPrivileges = deniedPrivileges;

      return await this.userRepository.save(user);
    } catch (error: any) {
      nextError(error);
    }
  }

  public async searchUsers(query: string): Promise<User[]> {
    return this.userRepository.find({
      where: { email: Like(`%${query}%`) },
      select: ['email', 'grantedPrivileges', 'id', 'name'],
      take: 10,
    });
  }
}
