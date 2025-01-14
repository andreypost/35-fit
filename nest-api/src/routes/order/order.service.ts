import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Price } from '../../entities/price';
import { Order } from '../../entities/order';
import { UserService } from '../user/user.service';
import { CreateOrderDto } from './dto/create.order.dto';
import { nextError } from '../../utils/next.error';
import { msg } from '../../constants/messages';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Price)
    private readonly priceRepository: Repository<Price>,
    private readonly userService: UserService,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  public async createUserOrder(
    createOrderDto: CreateOrderDto,
    email: string,
  ): Promise<Order> {
    try {
      const { id, status, items } = createOrderDto;
      const priceIds = items.map(({ priceId }) => priceId);
      const prices = await this.priceRepository.findByIds(priceIds);

      if (prices.length !== priceIds.length) {
        throw new NotFoundException('One or more Price IDs are invalid');
      }

      const currentUser = await this.userService.findUserByEmail(email);
      if (!currentUser) {
        throw new NotFoundException(msg.USER_NOT_FOUND);
      }

      const newOrder = this.orderRepository.create({
        ...createOrderDto,
        user: currentUser,
      });
      return await this.orderRepository.save(newOrder);
    } catch (error: any) {
      nextError(error);
    }
  }

  public async getUserOrders(email: string): Promise<Order[]> {
    try {
      const currentUser = await this.userService.findUserByEmail(email);
      if (!currentUser) {
        throw new NotFoundException(msg.USER_NOT_FOUND);
      }

      return await this.orderRepository.find({
        where: { user: { id: currentUser.id } },
        relations: ['user'],
      });
    } catch (error: any) {
      nextError(error);
    }
  }
}
