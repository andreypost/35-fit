import { Controller, Post, Body, Res, Get, Delete, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import {
  CreateUserDto,
  DeleteUserDto,
  LoginUserDto,
} from './dto/create-user.dto';
// import { CreateUserDetailsDto } from './dto/create-user-details.dto';
// import { UserDetails } from '../entities/user.details';
import { User } from 'src/entities/user';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('create-new-user')
  async createNewUser(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ): Promise<any> {
    return await this.authService.createNewUser(createUserDto, res);
  }

  @Post('login')
  async loginUser(
    @Body() { email, password }: LoginUserDto,
    @Res() res: Response,
  ): Promise<any> {
    return await this.authService.validateLoginUser({ email, password }, res);
  }

  @Get('users')
  async getAllUsers(@Req() req: Request): Promise<User[]> {
    return this.authService.getAllUsers(req);
  }

  @Delete('delete-user-by-email')
  async deleteUserByEmail(
    @Body() deleteUserDto: DeleteUserDto,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<any> {
    return this.authService.deleteUserByEmail(deleteUserDto, res, req);
  }
}
