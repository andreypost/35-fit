import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Get,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserDetails } from 'src/interfaces/user-detais.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async handleUser(@Body() createUserDto: CreateUserDto): Promise<string> {
    const user = await this.userService.findUserByEmail(createUserDto.email);

    if (user) {
      const isPasswordValid = await this.userService.validateUser(
        createUserDto.email,
        createUserDto.password,
      );
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

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('details')
  async getUserDetails(): Promise<UserDetails[] | null> {
    return this.userService.fetchUserDetails();
  }
}
