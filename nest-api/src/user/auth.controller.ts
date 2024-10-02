import { Controller, Post, Body, Res, Get } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { CreateUserDetailsDto } from './dto/create-user-details.dto';
import { UserDetails } from '../entities/user.details';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('create-new-user')
  async handleUser(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ): Promise<any> {
    return await this.authService.createUser(createUserDto, res);
  }

  @Post('login')
  async signIn(
    @Body() { email, password }: LoginUserDto,
    @Res() res: Response,
  ): Promise<any> {
    return await this.authService.validateUser({ email, password }, res);
  }

  @Get('details')
  async findAllUserDetails(): Promise<UserDetails[]> {
    return this.authService.findAllUserDetails();
  }

  @Post('add-new-user-details')
  async addNewUserDetails(
    @Body() createUserDetailsDto: CreateUserDetailsDto,
  ): Promise<UserDetails> {
    return this.authService.addNewUserDetails(createUserDetailsDto);
  }

  @Get('count-by-country-details')
  async getUserCountByCountryDetails(): Promise<Record<string, number>> {
    return this.authService.getUserCountByCountryDetails();
  }

  @Get('average-earnings-by-country')
  async getAverageEarningsByCountry(): Promise<Record<string, number>> {
    return this.authService.getAverageEarningsByCountry();
  }

  @Get('users')
  async getAllUsers(): Promise<CreateUserDto[]> {
    return this.authService.getAllUsers();
  }
}
