import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { ApiOperation } from '@nestjs/swagger';
import { Public } from '../../../guards/public.routes';
import { DirService } from './dir.service';
import { Dirent } from 'fs';

@Controller('file/dir')
export class DirController {
  constructor(private readonly dirService: DirService) {}

  @Public()
  @Get('structure')
  @ApiOperation({ summary: 'file/dir/structure' })
  async structureDir(): Promise<Dirent[]> {
    return this.dirService.structureDir();
  }

  @Public()
  @Get('destructure')
  @ApiOperation({ summary: 'file/dir/destructure' })
  async destructureDir(): Promise<Dirent[]> {
    return this.dirService.destructureDir();
  }

  @Public()
  @Post('upload-slowly')
  @ApiOperation({ summary: 'file/dir/upload-slowly' })
  async uploadSlowly(@Req() req: Request): Promise<string> {
    return this.dirService.uploadSlowly(req);
  }
}
