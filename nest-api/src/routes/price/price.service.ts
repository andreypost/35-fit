import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Price } from '../../entities/price';
import { CreatePriceDto } from './dto/create.price.dto';
import { nextError } from '../../utils/next.error';

@Injectable()
export class PriceService {
  constructor(
    @InjectRepository(Price)
    private priceRepository: Repository<Price>,
  ) {}
  public async createOrderPrice(
    createPriceDTO: CreatePriceDto,
  ): Promise<CreatePriceDto | any> {
    try {
      const newPrice = this.priceRepository.create(createPriceDTO);

      return this.priceRepository.save(newPrice);
    } catch (error: any) {
      nextError(error);
    }
  }
}
