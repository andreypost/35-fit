import { Controller, Get, Query, BadRequestException } from '@nestjs/common';

@Controller()
export class HelloController {
  @Get('hello')
  getHello(@Query('user-name') userName: string): string {
    if (!userName) throw new BadRequestException('User name is required!');
    return `Hello ${userName}!`;
  }
}
