import { Module } from '@nestjs/common';
import { DataBaseModule } from '../../db/database.module';
import { JsonController } from './json/json.controller';
import { JsonService } from './json/json.service';
import { CsvController } from './csv/csv.controller';
import { CsvService } from './csv/csv.service';
import { DirController } from './dir/dir.controller';
import { ImageController } from './image/image.controller';
import { DirService } from './dir/dir.service';
import { ImageService } from './image/image.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [DataBaseModule],
  controllers: [JsonController, CsvController, DirController, ImageController],
  providers: [JsonService, CsvService, DirService, ImageService, UserService],
})
export class FileModule {}
