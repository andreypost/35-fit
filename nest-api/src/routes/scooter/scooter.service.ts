import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PriceService } from '../price/price.service';
import { Price } from '../../entities/price';
import { Scooter } from '../../entities/scooter';
import { CreateScooterDto } from './dto/create.scooter.dto';
import { handleError } from '../../utils/handle.error';
import { msg } from '../../constants/messages';

@Injectable()
export class ScooterService {
  constructor(
    @InjectRepository(Scooter)
    private readonly scooterRepository: Repository<Scooter>,
    private readonly priceService: PriceService,
  ) {}

  public async checkExistingScooter(
    createScooterDto: CreateScooterDto,
    returnedProductId: true,
  ): Promise<string | undefined>;

  public async checkExistingScooter(
    createScooterDto: CreateScooterDto,
    returnedProductId?: false,
  ): Promise<Price>;

  public async checkExistingScooter(
    createScooterDto: CreateScooterDto,
    returnedProductId: boolean = false,
  ): Promise<Price | string | undefined> {
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
          price: { id: priceId },
        },
        relations: ['price'],
      });

      if (existingScooter) {
        if (returnedProductId) {
          return existingScooter.id;
        }
        throw new ConflictException(
          `${model}, ${existingScooter.price.name} ${msg.PRODUCT_PRICE_ALREADY_IN_USE}`,
        );
      }

      return returnedProductId ? undefined : price;
    } catch (error: unknown) {
      handleError(error);
    }
  }

  public async createScooter(
    createScooterDto: CreateScooterDto,
  ): Promise<Scooter> {
    try {
      const price = await this.checkExistingScooter(createScooterDto, false);

      return await this.scooterRepository.save({
        ...createScooterDto,
        price,
      });
    } catch (error: unknown) {
      handleError(error);
    }
  }
}
