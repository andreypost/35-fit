import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Price } from '../../entities/price';
import { CreatePriceDto } from './dto/create.price.dto';
import { nextError } from '../../utils/next.error';
import { msg } from '../../constants/messages';

@Injectable()
export class PriceService {
  constructor(
    @InjectRepository(Price)
    private priceRepository: Repository<Price>,
  ) {}

  public async checkSetPriceByName(
    priceName: string,
    returnPrice: boolean,
  ): Promise<string> {
    try {
      const existingPrice = await this.priceRepository.findOne({
        where: { name: priceName },
      });

      if (existingPrice) {
        if (!returnPrice) {
          throw new ConflictException(
            existingPrice.name + msg.PRICE_NAME_ALREADY_EXIST,
          );
        } else if (returnPrice) {
          return existingPrice?.id;
        }
      }
    } catch (error: any) {
      nextError(error);
    }
  }

  public async createProductPrice(
    createPriceDTO: CreatePriceDto,
  ): Promise<Price> {
    try {
      await this.checkSetPriceByName(createPriceDTO.name, false);
      return await this.priceRepository.save(createPriceDTO);
    } catch (error: any) {
      nextError(error);
    }
  }

  public async getPriceById(priceId: string): Promise<Price> {
    try {
      const price = await this.priceRepository.findOne({
        where: { id: priceId },
      });
      if (!price) {
        throw new NotFoundException(msg.PRICE_NOT_FOUND);
      }

      return price;
    } catch (error: any) {
      nextError(error);
    }
  }

  public async getPriceByType(productType: string): Promise<string> {
    try {
      const priceByType = await this.priceRepository.findOne({
        where: { productType },
      });

      if (!priceByType) {
        throw new NotFoundException(
          `${msg.PRICE_NOT_FOUND} for ${productType}`,
        );
      }

      return priceByType.id;
    } catch (error: any) {
      nextError(error);
    }
  }
}
