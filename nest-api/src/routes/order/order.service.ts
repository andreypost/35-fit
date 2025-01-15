import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Price } from '../../entities/price';
import { OrderItem } from '../../entities/order.item';
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
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly userService: UserService,
  ) {}

  public async createUserOrder(
    createOrderDto: CreateOrderDto,
    email: string,
  ): Promise<Order> {
    try {
      const currentUser = await this.userService.findUserByEmail(email);
      if (!currentUser) {
        throw new NotFoundException(msg.USER_NOT_FOUND);
      }

      const { id, status, items } = createOrderDto;
      const priceIds = items.map(({ priceId }) => priceId);

      const prices = await this.priceRepository.find({
        where: { id: In(priceIds) },
      });

      if (prices.length !== priceIds.length) {
        throw new NotFoundException(msg.ONE_OR_MORE_ID_ARE_INVALID);
      }

      console.log('priceIds: ', priceIds);
      console.log('prices: ', prices);

      const newOrder = this.orderRepository.create({
        id,
        status,
        user: currentUser,
        items: items.map(({ priceId, quantity }) => {
          const price = prices.find(({ id }) => id === priceId);
          return this.orderItemRepository.create({
            price,
            quantity,
          });
        }),
      });

      newOrder.calculateFinalTotalPrice();

      console.log('prices: ', newOrder);

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
