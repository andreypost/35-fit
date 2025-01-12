import { Body, Controller, Post } from '@nestjs/common';
import { PriceService } from './price.service';
import { CreatePriceDto } from './dto/create.price.dto';
import { Price } from 'src/entities/price';

@Controller('price')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @Post('create')
  async createOrderPrice(
    @Body() createPriceDto: CreatePriceDto,
  ): Promise<Price> {
    return this.priceService.createOrderPrice(createPriceDto);
  }
}
