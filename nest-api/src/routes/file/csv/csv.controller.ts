import { Controller, Get } from '@nestjs/common';
import { CsvService } from './csv.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('file/csv')
export class CsvController {
  constructor(private readonly csvService: CsvService) {}

  @Get('read')
  @ApiOperation({ summary: 'file/csv/read' })
  async csvReadFile(): Promise<any> {
    return this.csvService.csvReadFile();
  }
}
