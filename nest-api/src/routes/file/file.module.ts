import { Module } from '@nestjs/common';
import { JsonController } from './json/json.controller';
import { JsonService } from './json/json.service';
import { CsvController } from './csv/csv.controller';
import { CsvService } from './csv/csv.service';
import { DataBaseModule } from 'src/db/database.module';

@Module({
  imports: [DataBaseModule],
  controllers: [JsonController, CsvController],
  providers: [JsonService, CsvService],
})
export class FileModule {}
