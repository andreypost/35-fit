import {
  Controller,
  Post,
  Body,
  Get,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserDetailsDto } from './dto/create-user-details.dto';
import { UserDetails } from '../entities/user.details';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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

  @Post('create-new-user')
  async handleUser(@Body() createUserDto: CreateUserDto): Promise<string> {
    const user = await this.authService.findUserByEmail(createUserDto.email);

    if (user) {
      const isPasswordValid =
        await this.authService.validateUser(createUserDto);
      if (isPasswordValid) {
        return 'User validated successfully';
      } else {
        throw new UnauthorizedException('Invalid password');
      }
    } else {
      await this.authService.createUser(createUserDto);
      return 'User created successfully';
    }
  }
}
