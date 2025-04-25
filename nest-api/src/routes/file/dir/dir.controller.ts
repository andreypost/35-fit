import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Public } from '../../../guards/public.routes';
import { DirService } from './dir.service';

@Controller('file/dir')
export class DirController {
  constructor(private readonly dirService: DirService) {}

  @Public()
  @Get('structure')
  @ApiOperation({ summary: 'file/dir/structure' })
  async structureDir(): Promise<void> {
    return this.dirService.structureDir();
  }

  @Public()
  @Get('destructure')
  @ApiOperation({ summary: 'file/dir/destructure' })
  async destructureDir(): Promise<void> {
    return this.dirService.destructureDir();
  }
}
