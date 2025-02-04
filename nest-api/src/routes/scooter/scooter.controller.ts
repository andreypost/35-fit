import { Body, Controller, Post } from '@nestjs/common';
import { ScooterService } from './scooter.service';
import { Public } from '../../auth/public';
import { CreateScooterDto } from './dto/create.scooter.dto';
import { Price } from '../../entities/price';
import { Scooter } from '../../entities/scooter';

@Controller('scooter')
export class ScooterController {
  constructor(private readonly scooterService: ScooterService) {}

  @Public()
  @Post('check')
  async checkExistingScooter(
    @Body() createScooterDto: CreateScooterDto,
  ): Promise<Price> {
    return this.scooterService.checkExistingScooter(createScooterDto);
  }

  @Public()
  @Post('create')
  async createScooter(
    @Body() createScooterDto: CreateScooterDto,
  ): Promise<Scooter> {
    return this.scooterService.createScooter(createScooterDto);
  }
}
