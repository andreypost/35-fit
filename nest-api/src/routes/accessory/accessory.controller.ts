import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { ApiOperation } from '@nestjs/swagger';
import { AccessoryService } from './accessory.service';
import { Public } from '../../guards/public.routes';
import { Accessory } from '../../entities/accessory';
import { CreateAccessoryDto } from './dto/create.accessory.dto';

@Controller('accessory')
export class AccessoryController {
  constructor(private readonly accessoryService: AccessoryService) {}

  @Public()
  @Post('check')
  @ApiOperation({ summary: 'check' })
  async checkExistingAccessory(
    @Body() createAccessoryDto: CreateAccessoryDto,
    @Req() req: Request,
  ): Promise<string> {
    return await this.accessoryService.checkExistingAccessory(
      createAccessoryDto,
      true,
      req,
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
