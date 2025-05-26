import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PriceService } from '../price/price.service';
import { Price } from '../../entities/price';
import { Accessory } from '../../entities/accessory';
import { CreateAccessoryDto } from './dto/create.accessory.dto';
import { handleError } from '../../utils/handle.error';
import { msg } from '../../constants/messages';

@Injectable()
export class AccessoryService {
  constructor(
    private readonly priceService: PriceService,
    @InjectRepository(Accessory)
    private readonly accessoryRepository: Repository<Accessory>,
  ) {}

  public async checkExistingAccessory(
    createAccessoryDto: CreateAccessoryDto,
    returnedProductId: true,
  ): Promise<string | undefined>;

  public async checkExistingAccessory(
    createAccessoryDto: CreateAccessoryDto,
    returnedProductId: false,
  ): Promise<Price>;

  public async checkExistingAccessory(
    createAccessoryDto: CreateAccessoryDto,
    returnedProductId: boolean = false,
  ): Promise<Price | string | undefined> {
    try {
      const { name, priceId } = createAccessoryDto;
      const price = await this.priceService.getPriceById(priceId);

      if (price.productType !== 'accessory') {
        throw new BadRequestException(
          `${price.productType} ${msg.PRODUCT_TYPE_IS_NOT_APPROPRIATE}`,
        );
      }

      const existingAccessory = await this.accessoryRepository.findOne({
        where: {
          name,
          price: { id: priceId },
        },
        relations: ['price'],
      });

      if (existingAccessory) {
        if (returnedProductId) {
          return existingAccessory.id;
        }
        throw new ConflictException(
          `${name}, ${existingAccessory.price.name} ${msg.PRODUCT_PRICE_ALREADY_IN_USE}`,
        );
      }

      return returnedProductId ? undefined : price;
    } catch (error: unknown) {
      handleError(error);
    }
  }

  public async createAccessory(
    createAccessoryDto: CreateAccessoryDto,
  ): Promise<Accessory> {
    try {
      const price = await this.checkExistingAccessory(
        createAccessoryDto,
        false,
      );
      return await this.accessoryRepository.save({
        ...createAccessoryDto,
        price,
      });
    } catch (error: unknown) {
      handleError(error);
    }
  }
}
