import { Body, Controller, Post } from '@nestjs/common';
import { PriceService } from './price.service';
import { CreatePriceDto } from './dto/create.price.dto';
import { Price } from '../../entities/price';
import { Public } from '../../auth/public';

@Controller('price')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @Public()
  @Post('create')
  async createProductPrice(
    @Body() createPriceDto: CreatePriceDto,
  ): Promise<Price> {
    return this.priceService.createProductPrice(createPriceDto);
  }

  @Public()
  @Post('price-by-type')
  async getPriceByType(
    @Body() { productType }: { productType: string },
  ): Promise<string> {
    return this.priceService.getPriceByType(productType);
  }
}
