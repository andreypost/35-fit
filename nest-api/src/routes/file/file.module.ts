import { Module } from '@nestjs/common';
import { DataBaseModule } from '../../db/database.module';
import { JsonController } from './json/json.controller';
import { JsonService } from './json/json.service';
import { CsvController } from './csv/csv.controller';
import { CsvService } from './csv/csv.service';
import { DirController } from './dir/dir.controller';
import { DirService } from './dir/dir.service';

@Module({
  imports: [DataBaseModule],
  controllers: [JsonController, CsvController, DirController],
  providers: [JsonService, CsvService, DirService],
})
export class FileModule {}
