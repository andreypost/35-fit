import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AccessoryService } from './accessory.service';
import { Public } from '../../guards/public.routes';
import { CreateAccessoryDto } from './dto/create.accessory.dto';
import { Accessory } from '../../entities/accessory';

@Controller('accessory')
export class AccessoryController {
  constructor(private readonly accessoryService: AccessoryService) {}

  @Public()
  @Post('check')
  @ApiOperation({ summary: 'check' })
  async checkExistingAccessory(
    @Body() createAccessoryDto: CreateAccessoryDto,
  ): Promise<string> {
    return await this.accessoryService.checkExistingAccessory(
      createAccessoryDto,
      true,
    );
  }

  @Post('create')
  @Public()
  @ApiOperation({ summary: 'create' })
  async createAccessory(
    @Body() createAccessoryDto: CreateAccessoryDto,
  ): Promise<Accessory> {
    return await this.accessoryService.createAccessory(createAccessoryDto);
  }
}
