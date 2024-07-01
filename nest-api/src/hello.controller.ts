import { BadRequestException, Controller, Get, Query } from '@nestjs/common';

@Controller('hello')
export class HelloController {
  @Get()
  async getHello(@Query('user-name') userName: string): Promise<string> {
    if (!userName) throw new BadRequestException('User name is required!');
    // return await this.getUserGreetings(userName);
    return `Hello ${userName}!`;
  }

  // async getUserGreetings(userName: string): Promise<string> {
  //   return new Promise((res, rej) => {
  //     setTimeout(() => {
  //       res(`Hello ${userName}!`);
  //     }, 1000);
  //   });
  // }
}
