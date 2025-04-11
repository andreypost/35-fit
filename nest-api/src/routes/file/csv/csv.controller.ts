import { Controller, Get } from '@nestjs/common';
import { CsvService } from './csv.service';
import { ApiOperation } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { Public } from '../../../guards/public.routes';

@Controller('file/csv')
export class CsvController {
  constructor(private readonly csvService: CsvService) {}

  @Public()
  @Get('read')
  @ApiOperation({ summary: 'file/csv/read' })
  async csvReadFile(res: Response): Promise<any> {
    return this.csvService.csvReadFile(res);
  }
}
