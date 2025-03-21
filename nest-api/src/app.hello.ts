import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from './guards/public.routes';

@Public()
@Controller()
@ApiTags()
export class AppHello {
  @Get()
  @ApiOperation({ summary: 'Hello from Nest.js!' })
  async getHello(): Promise<string> {
    return 'Hello from Nest.js!';
  }
}
