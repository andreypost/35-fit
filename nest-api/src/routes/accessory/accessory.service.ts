import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PriceService } from '../price/price.service';
import { Accessory } from '../../entities/accessory';
import { nextError } from '../../utils/next.error';
import { CreateAccessoryDto } from './dto/create.accessory.dto';
import { msg } from 'src/constants/messages';

@Injectable()
export class AccessoryService {
  constructor(
    private readonly priceService: PriceService,
    @InjectRepository(Accessory)
    private readonly accessoryRepository: Repository<Accessory>,
  ) {}

  public async checkExistingAccessory(
    createAccessoryDto: CreateAccessoryDto,
  ): Promise<Accessory> {
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
          priceId: { id: priceId },
        },
      });

      if (existingAccessory) {
        throw new ConflictException(
          `${name}, ${existingAccessory.priceId.name} ${msg.PRODUCT_PRICE_ALREADY_IN_USE}`,
        );
      }
      // return price;
      return;
    } catch (error: any) {
      nextError(error);
    }
  }

  public async createAccessory(
    createAccessoryDto: CreateAccessoryDto,
  ): Promise<Accessory> {
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
          priceId: { id: priceId },
        },
      });

      if (existingAccessory) {
        throw new ConflictException(
          `${name}, ${existingAccessory.priceId.name} ${msg.PRODUCT_PRICE_ALREADY_IN_USE}`,
        );
      }
      console.log(createAccessoryDto);
      return await this.accessoryRepository.save({
        ...createAccessoryDto,
        priceId: price,
      });
    } catch (error: any) {
      nextError(error);
    }
  }
}
