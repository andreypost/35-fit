import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Price } from '../../entities/price';
import { Scooter } from '../../entities/scooter';
import { PriceService } from '../price/price.service';
import { CreateScooterDto } from './dto/create.scooter.dto';
import { msg } from '../../constants/messages';
import { nextError } from '../../utils/next.error';

@Injectable()
export class ScooterService {
  constructor(
    @InjectRepository(Scooter)
    private readonly scooterRepository: Repository<Scooter>,
    private readonly priceService: PriceService,
  ) {}

  public async checkExistingScooter(
    createScooterDto: CreateScooterDto,
    returnedProductId: boolean = false,
  ): Promise<Price | any> {
    try {
      const { model, priceId } = createScooterDto;
      const price = await this.priceService.getPriceById(priceId);

      if (price.productType !== 'scooter') {
        throw new BadRequestException(
          `${price.productType} ${msg.PRODUCT_TYPE_IS_NOT_APPROPRIATE}`,
        );
      }

      const existingScooter = await this.scooterRepository.findOne({
        where: {
          model,
          priceId: { id: priceId },
        },
      });

      if (existingScooter) {
        if (returnedProductId) {
          return existingScooter.id;
        }
        throw new ConflictException(
          `${model}, ${existingScooter.priceId.name} ${msg.PRODUCT_PRICE_ALREADY_IN_USE}`,
        );
      }

      if (!returnedProductId) {
        return price;
      }
    } catch (error: any) {
      nextError(error);
    }
  }

  public async createScooter(
    createScooterDto: CreateScooterDto,
  ): Promise<Scooter> {
    try {
      const price = await this.checkExistingScooter(createScooterDto);

      return await this.scooterRepository.save({
        ...createScooterDto,
        priceId: price,
      });
    } catch (error: any) {
      nextError(error);
    }
  }
}
