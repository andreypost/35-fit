import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  ParseBoolPipe,
  UseInterceptors,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { Public } from '../../guards/public.routes';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto } from './dto/create.user.dto';
import { User } from '../../entities/user';
import { HttpResponse } from '../../pipes/http.response';
import { CurrentUserEmail } from '../../pipes/current.user.email';
import { ExecutionTimeInterceptor } from '../../interceptors/execution.time';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('create-new-user')
  async createNewUser(
    @Body() createUserDto: CreateUserDto,
    @HttpResponse() res: Response,
  ): Promise<User> {
    return await this.userService.createNewUser(createUserDto, res);
  }

  @Public()
  @Post('login')
  @UseInterceptors(ExecutionTimeInterceptor)
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
    return await this.userService.validateUserByAuthToken(req, res);
  }

  @Get('users')
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @Post('logout')
  async logoutUser(
    @Body('deleteAccount', ParseBoolPipe) deleteAccount: boolean,
    @CurrentUserEmail() email: string,
    @HttpResponse() res: Response,
  ): Promise<{ message: string }> {
    return await this.userService.logoutUser(deleteAccount, email, res);
  }
}
