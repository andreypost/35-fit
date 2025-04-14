import { Controller, Get, Header, Res, StreamableFile } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { CsvService } from './csv.service';
import { Public } from '../../../guards/public.routes';

@Controller('file/csv')
export class CsvController {
  constructor(private readonly csvService: CsvService) {}

  // @Public()
  // @Get('read')
  // @Header('Content-Type', 'text/csv')
  // @Header('Content-Disposition', 'attachment; filename="users-data.csv"')
  // @ApiOperation({ summary: 'file/csv/read' })
  // async csvReadFile(
  //   @Res({ passthrough: true }) res: Response,
  // ): Promise<StreamableFile> {
  //   const csvStream = await this.csvService.csvReadWriteFile(res);
  //   return new StreamableFile(csvStream);
  // }

  @Public()
  @Get('read')
  @ApiOperation({ summary: 'file/csv/read' })
  async csvReadWriteFile(@Res() res: Response): Promise<void> {
    return this.csvService.csvReadWriteFile(res, true);
  }
}
