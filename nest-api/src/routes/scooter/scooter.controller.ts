import { Body, Controller, Post } from '@nestjs/common';
import { ScooterService } from './scooter.service';
import { Public } from '../../auth/public';
import { CreateScooterDto } from './dto/create.scooter.dto';
import { Scooter } from '../../entities/scooter';

@Controller('scooter')
export class ScooterController {
  constructor(private readonly scooterService: ScooterService) {}

  @Post('create')
  @Public()
  async createScooter(
    @Body() createScooterDto: CreateScooterDto,
  ): Promise<Scooter> {
    return this.scooterService.createScooter(createScooterDto);
  }
}
