import { Controller, Get, Query } from '@nestjs/common';

@Controller()
export class HelloController {
  @Get('Hello, here my first expierince with nest!')
  getHello(@Query('user-name') userName: string): string {
    return `Hello ${userName}, here my first expierince with nest!`;
  }
}
