import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  ServiceUnavailableException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { config } from 'dotenv';
import { User } from '../../entities/user';
import { CreateUserDto, LoginUserDto } from './dto/user.dto';
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
      const { email } = createUserDto;

      const userRoles = UserPrivileges.isAdminEmail(email)
        ? UserPrivileges.Administrator
        : UserPrivileges.ProjectCreator;

      // this.userRepository.create(...) will hydrate a proper entity instance first,
      // then will trigger @BeforeInsert() to hash password in User entity

      const newUser = this.userRepository.create({
        ...createUserDto,
        grantedPrivileges: userRoles,
        deniedPrivileges: UserPrivileges.None,
      });

      const savedUser = await this.userRepository.save(newUser);

      await this.setAuthToken(email, savedUser.id, res);

      return savedUser;
    } catch (error: any) {
      await deleteAuthToken(res);
      if (error.code === '23505') {
        throw new ConflictException(msg.EMAIL_ALREADY_EXIST);
      }
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

      const isValidPassword = await user.checkPassword(password);

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

  public async searchUsers(searchQuery: string): Promise<User[]> {
    try {
      return await this.userRepository.find({
        where: { email: Like(`%${searchQuery}%`) },
        select: ['email', 'grantedPrivileges', 'id', 'name'],
        take: 10,
      });
    } catch (error: any) {
      nextError(error);
    }
  }

  public async updateUserPrivileges(
    email: string,
    id: string,
    grantedPrivileges: number,
    deniedPrivileges: number,
  ): Promise<User> {
    try {
      const currentUser = await this.findUserByEmail(email);

      if (!currentUser) {
        throw new NotFoundException(msg.USER_NOT_FOUND);
      }

      const privileges = new UserPrivileges(
        currentUser.grantedPrivileges,
        currentUser.deniedPrivileges,
      );

      if (!privileges.hasGrantedPrivilege(UserPrivileges.Administrator)) {
        throw new ForbiddenException(msg.YOU_DO_NOT_HAVE_PERMISSION);
      }

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

  public sqlQueryVulnerability = async (
    email: string,
    password: string,
  ): Promise<void> => {
    try {
      console.log('sqlQueryVulnerability email: ', email);
      const unsafeQuery = `SELECT * FROM "user" WHERE email = '${email}'`;
      const unsafeResult = await this.userRepository.query(unsafeQuery);
      console.log('sqlQueryVulnerability: ', unsafeResult);
      return unsafeResult;
    } catch (error: any) {
      nextError(error);
    }
  };
}
