import { Controller, Post, Body, Res, Get, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { Public } from '../auth/public';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto/create.user.dto';
import { User } from '../entities/user';
import { CurrentUserEmail } from '../auth/current.user.decorator';

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

  @Public()
  @Get('validate')
  async validateUserByAuthToken(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.authService.validateUserByAuthToken(req, res);
  }

  @Post('logout')
  async logoutUser(
    @Body() { deleteAccount }: { deleteAccount: boolean },
    @CurrentUserEmail() email: string,
    @Res() res: Response,
  ): Promise<any> {
    return this.authService.logoutUser(deleteAccount, email, res);
  }
}
