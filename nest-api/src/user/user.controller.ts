import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

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
}
