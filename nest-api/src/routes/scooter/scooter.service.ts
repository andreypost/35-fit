import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Scooter } from '../../entities/scooter';
import { Price } from '../../entities/price';
import { CreateScooterDto } from './dto/create.scooter.dto';
import { nextError } from '../../utils/next.error';

@Injectable()
export class ScooterService {
  constructor(
    @InjectRepository(Scooter)
    private scooterRepository: Repository<Scooter>,
    @InjectRepository(Price)
    private priceRepsoitory: Repository<Price>,
  ) {}

  public async createScooter(
    createScooterDto: CreateScooterDto,
  ): Promise<Scooter> {
    try {
      const existingScooter = await this.scooterRepository.findOne({
        where: { model: createScooterDto.model },
      });
      if (existingScooter) return existingScooter;

      const price = await this.priceRepsoitory.findOne({
        where: { id: createScooterDto.priceId },
      });

      if (!price) {
        throw new NotFoundException('price not found');
      }

      const newScooter = this.scooterRepository.create({
        ...createScooterDto,
        price,
      });

      return this.scooterRepository.save(newScooter);
    } catch (error: any) {
      nextError(error);
    }
  }
}
