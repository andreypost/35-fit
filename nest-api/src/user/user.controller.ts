import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Get,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDetailsDto, CreateUserDto } from './dto/create-user.dto';
import { User } from '../entities/user';
import { UserDetails } from 'src/interfaces/user';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
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

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('details')
  async getUserDetails(@Res() res): Promise<UserDetails[]> {
    const file = createReadStream(
      join(process.cwd(), 'data', 'user-collection.json'),
    );
    return file.pipe(res);
  }

  @Post('add')
  async addNewUserToJSON(
    @Body() createUserDetailsDto: CreateUserDetailsDto,
  ): Promise<UserDetails> {
    if (!createUserDetailsDto)
      throw new BadRequestException('Invalid user data');
    return this.userService.addUserToJSON(createUserDetailsDto);
  }

  @Get('count-by-country')
  async getCountBycountry() {
    return this.userService.getUserCountByCounrty();
  }
}
