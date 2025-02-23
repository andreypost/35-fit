import { Controller, Get } from '@nestjs/common';
import { Public } from './guards/public.routes';

@Public()
@Controller()
export class AppHello {
  @Get()
  async getHello(): Promise<string> {
    return 'Hello from Nest.js!';
  }
}
