import { Controller, Post, Body, Get, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { Public } from '../../auth/public';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto } from './dto/create.user.dto';
import { User } from '../../entities/user';
import { HttpResponse } from '../../utils/http.response.decorator';
import { CurrentUserEmail } from '../../utils/current.user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('create-new-user')
  async createNewUser(
    @Body() createUserDto: CreateUserDto,
    @HttpResponse() res: Response,
  ): Promise<{ message: string }> {
    return await this.userService.createNewUser(createUserDto, res);
  }

  @Public()
  @Post('login')
  async loginUser(
    @Body() { email, password, keepLoggedIn }: LoginUserDto,
    @HttpResponse() res: Response,
  ): Promise<User> {
    return await this.userService.loginUser(
      { email, password, keepLoggedIn },
      res,
    );
  }

  @Public()
  @Get('validate')
  async validateUserByAuthToken(
    @Req() req: Request,
    @HttpResponse() res: Response,
  ): Promise<User> {
    return this.userService.validateUserByAuthToken(req, res);
  }

  @Get('users')
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Post('logout')
  async logoutUser(
    @Body() { deleteAccount }: { deleteAccount: boolean },
    @CurrentUserEmail() email: string,
    @HttpResponse() res: Response,
  ): Promise<{ message: string }> {
    return this.userService.logoutUser(deleteAccount, email, res);
  }
}
