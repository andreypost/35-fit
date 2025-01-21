import { Body, Controller, Post } from '@nestjs/common';
import { AccessoryService } from './accessory.service';
import { Accessory } from '../../entities/accessory';
import { CreateAccessoryDto } from './dto/create.accessory.dto';

@Controller('accessory')
export class AccessoryController {
  constructor(private readonly accessoryService: AccessoryService) {}
  @Post('create')
  async createAccessory(
    @Body() createAccessoryDto: CreateAccessoryDto,
  ): Promise<Accessory> {
    return this.accessoryService.createAccessory(createAccessoryDto);
  }
}
