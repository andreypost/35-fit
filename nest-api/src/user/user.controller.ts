import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Get,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDetailsJsonService } from './user.details.json.service';
import { CreateUserDetailsDto, CreateUserDto } from './dto/create-user.dto';
import { User } from '../entities/user';
import { IUserDetails } from 'src/interfaces/user';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userDetailsJsonService: UserDetailsJsonService,
  ) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post('create-auth-user')
  async handleUser(@Body() createUserDto: CreateUserDto): Promise<string> {
    const user = await this.userService.findUserByEmail(createUserDto.email);

    if (user) {
      const isPasswordValid = await this.userService.validateUser({
        email: createUserDto.email,
        password: createUserDto.password,
      });
      if (isPasswordValid) {
        return 'User validated successfully';
      } else {
        throw new BadRequestException('Invalid password');
      }
    } else {
      await this.userService.createUser(createUserDto);
      return 'User created successfully';
    }
  }

  @Get('user-details')
  async getUserDetails(@Res() res): Promise<IUserDetails[]> {
    const file = createReadStream(
      join(process.cwd(), 'data', 'user-collection.json'),
    );
    return file.pipe(res);
  }

  @Post('add-new-user')
  async addNewUser(
    @Body() createUserDetailsDto: CreateUserDetailsDto,
  ): Promise<IUserDetails> {
    if (!createUserDetailsDto) {
      throw new BadRequestException('Invalid user data');
    }
    return this.userDetailsJsonService.addNewUser(createUserDetailsDto);
  }

  @Get('count-by-country')
  async getUserCountByCountry() {
    return this.userDetailsJsonService.getUserCountByCountry();
  }

  @Get('average-earnings-by-country')
  async getAverageEarningsByCountry() {
    return this.userDetailsJsonService.getAverageEarningsByCountry();
  }
}
