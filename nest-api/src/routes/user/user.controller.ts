import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  ParseBoolPipe,
  UseInterceptors,
  Patch,
  Param,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { Public } from '../../guards/public.routes';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { CreateUserDto, LoginUserDto } from './dto/create.user.dto';
import { User } from '../../entities/user';
import { HttpResponse } from '../../pipes/http.response';
import { CurrentUserEmail } from '../../pipes/current.user.email';
import { ExecutionTimeInterceptor } from '../../interceptors/execution.time';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Throttle({ default: { ttl: 6000, limit: 2, blockDuration: 600000 } })
  @Public()
  @Post('create-new-user')
  @ApiOperation({ summary: 'create-new-user' })
  async createNewUser(
    @Body() createUserDto: CreateUserDto,
    @HttpResponse() res: Response,
  ): Promise<User> {
    return await this.userService.createNewUser(createUserDto, res);
  }

  @Public()
  @Post('login')
  @UseInterceptors(ExecutionTimeInterceptor)
  @ApiOperation({ summary: 'login' })
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
  @ApiOperation({ summary: 'validate' })
  async validateUserByAuthToken(
    @Req() req: Request,
    @HttpResponse() res: Response,
  ): Promise<User> {
    return await this.userService.validateUserByAuthToken(req, res);
  }

  @SkipThrottle()
  @Public()
  @Get('users')
  @ApiOperation({ summary: 'users' })
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @Post('logout')
  @ApiOperation({ summary: 'logout' })
  async logoutUser(
    @Body('deleteAccount', ParseBoolPipe) deleteAccount: boolean,
    @CurrentUserEmail() email: string,
    @HttpResponse() res: Response,
  ): Promise<{ message: string }> {
    return await this.userService.logoutUser(deleteAccount, email, res);
  }

  @Patch(':id/privileges')
  @ApiOperation({ summary: ':id/privileges' })
  async updateUserPrivileges(
    @Param('id') id: string,
    @Body() { grantedPrivileges, deniedPrivileges },
  ): Promise<User> {
    return this.userService.updateUserPrivileges(
      id,
      grantedPrivileges,
      deniedPrivileges,
    );
  }
}
