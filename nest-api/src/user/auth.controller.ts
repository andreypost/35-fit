import { Controller, Post, Body, Res, Get, Delete, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { Public } from '../utils/public';
import { AuthService } from './auth.service';
import {
  CreateUserDto,
  DeleteUserDto,
  LoginUserDto,
} from './dto/create-user.dto';
import { User } from '../entities/user';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('create-new-user')
  async createNewUser(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ): Promise<any> {
    return await this.authService.createNewUser(createUserDto, res);
  }

  @Public()
  @Post('login')
  async loginUser(
    @Body() { email, password, keepLoggedIn }: LoginUserDto,
    @Res() res: Response,
  ): Promise<any> {
    return await this.authService.validateLoginUser(
      { email, password, keepLoggedIn },
      res,
    );
  }

  @Get('users')
  async getAllUsers(): Promise<User[]> {
    return this.authService.getAllUsers();
  }

  @Delete('delete-user-by-email')
  async deleteUserByEmail(
    @Body() deleteUserDto: DeleteUserDto,
    @Res() res: Response,
  ): Promise<any> {
    return this.authService.deleteUserByEmail(deleteUserDto, res);
  }

  @Public()
  @Get('validate')
  async validateUserByAuthToken(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.authService.validateUserByAuthToken(req, res);
  }

  @Post('logout')
  async logoutUser(@Res() res: Response): Promise<any> {
    return this.authService.logoutUser(res);
  }
}
