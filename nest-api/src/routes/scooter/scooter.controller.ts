import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ScooterService } from './scooter.service';
import { Public } from '../../guards/public.routes';
import { CreateScooterDto } from './dto/create.scooter.dto';
import { Scooter } from '../../entities/scooter';

@Controller('scooter')
export class ScooterController {
  constructor(private readonly scooterService: ScooterService) {}

  @Public()
  @Post('check')
  @ApiOperation({ summary: 'check' })
  async checkExistingScooter(
    @Body() createScooterDto: CreateScooterDto,
  ): Promise<string> {
    return await this.scooterService.checkExistingScooter(
      createScooterDto,
      true,
    );
  }

  @Public()
  @Post('create')
  @ApiOperation({ summary: 'create' })
  async createScooter(
    @Body() createScooterDto: CreateScooterDto,
  ): Promise<Scooter> {
    return await this.scooterService.createScooter(createScooterDto);
  }
}
