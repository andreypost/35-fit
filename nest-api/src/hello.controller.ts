import { BadRequestException, Controller, Get, Query } from '@nestjs/common';

@Controller('hello')
export class HelloController {
  @Get()
  async getHello(@Query('user-name') userName: string): Promise<string> {
    if (!userName) throw new BadRequestException('User name is required!');
    return `Hello ${userName}!`;
  }
}
