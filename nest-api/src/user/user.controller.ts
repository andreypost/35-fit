import { Controller, Post, Body, Res, Get, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { Public } from '../auth/public';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto } from './dto/create.user.dto';
import { User } from '../entities/user';
import { CurrentUserEmail } from '../auth/current.user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('create-new-user')
  async createNewUser(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ): Promise<any> {
    return await this.userService.createNewUser(createUserDto, res);
  }

  @Public()
  @Post('login')
  async loginUser(
    @Body() { email, password, keepLoggedIn }: LoginUserDto,
    @Res() res: Response,
  ): Promise<any> {
    return await this.userService.validateLoginUser(
      { email, password, keepLoggedIn },
      res,
    );
  }

  @Get('users')
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Public()
  @Get('validate')
  async validateUserByAuthToken(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.userService.validateUserByAuthToken(req, res);
  }

  @Post('logout')
  async logoutUser(
    @Body() { deleteAccount }: { deleteAccount: boolean },
    @CurrentUserEmail() email: string,
    @Res() res: Response,
  ): Promise<any> {
    return this.userService.logoutUser(deleteAccount, email, res);
  }
}
