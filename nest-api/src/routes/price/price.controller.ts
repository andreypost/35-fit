import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { PriceService } from './price.service';
import { Public } from '../../guards/public.routes';
import { CreatePriceDto } from './dto/create.price.dto';
import { Price } from '../../entities/price';

@Controller('price')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @Public()
  @Get('check-set')
  @ApiOperation({ summary: 'check-set' })
  async checkSetPriceByName(
    @Query('priceName') priceName: string,
  ): Promise<string> {
    return await this.priceService.checkSetPriceByName(priceName, true);
  }

  @Public()
  @Post('create')
  @ApiOperation({ summary: 'create' })
  async createProductPrice(
    @Body() createPriceDto: CreatePriceDto,
  ): Promise<Price> {
    return await this.priceService.createProductPrice(createPriceDto);
  }

  /*   @Public()
  @Get('price-by-type')
  async getPriceByType(
    @Query('productType') productType: string,
  ): Promise<string> {
    return await this.priceService.getPriceByType(productType);
  } */
}
