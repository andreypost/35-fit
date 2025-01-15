import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Scooter } from '../../entities/scooter';
import { PriceService } from '../price/price.service';
import { CreateScooterDto } from './dto/create.scooter.dto';
import { nextError } from '../../utils/next.error';
import { msg } from 'src/constants/messages';

@Injectable()
export class ScooterService {
  constructor(
    @InjectRepository(Scooter)
    private readonly scooterRepository: Repository<Scooter>,
    private readonly priceService: PriceService,
  ) {}

  public async createScooter(
    createScooterDto: CreateScooterDto,
  ): Promise<Scooter> {
    try {
      const price = await this.priceService.getPriceById(
        createScooterDto.priceId,
      );

      if (price.productType !== 'scooter') {
        throw new BadRequestException(
          msg.PRICE_MUST_HAVE_APPROPRIATE + price.productType,
        );
      }

      const existingScooter = await this.scooterRepository.findOne({
        where: {
          model: createScooterDto.model,
          priceId: { id: createScooterDto.priceId },
        },
      });

      if (existingScooter) return existingScooter;

      const newScooter = this.scooterRepository.create({
        ...createScooterDto,
        priceId: price,
      });

      return await this.scooterRepository.save(newScooter);
    } catch (error: any) {
      nextError(error);
    }
  }
}
