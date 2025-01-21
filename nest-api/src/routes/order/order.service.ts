import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Scooter } from '../../entities/scooter';
import { Accessory } from '../../entities/accessory';
import { OrderItem } from '../../entities/order.item';
import { Order } from '../../entities/order';
import { UserService } from '../user/user.service';
import { CreateOrderDto } from './dto/create.order.dto';
import { nextError } from '../../utils/next.error';
import { msg } from '../../constants/messages';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Scooter)
    private readonly scooterRepository: Repository<Scooter>,
    @InjectRepository(Accessory)
    private readonly accessoryRepository: Repository<Accessory>,
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
      const user = await this.userService.findUserByEmail(email);
      if (!user) {
        throw new NotFoundException(msg.USER_NOT_FOUND);
      }

      const { status, items } = createOrderDto;
      const productId = items.map(({ productId }) => productId);

      const scooterOrders = await this.scooterRepository.find({
        where: { id: In(productId) },
      });

      const accessoryOrders = await this.accessoryRepository.find({
        where: { id: In(productId) },
      });

      // console.log('scooterOrders: ', scooterOrders);
      // console.log('accessoryOrders: ', accessoryOrders);

      if (productId.length !== scooterOrders.length + accessoryOrders.length) {
        throw new NotFoundException(msg.ONE_OR_MORE_IDs_ARE_INVALID);
      }

      const newOrder = this.orderRepository.create({
        status,
        user,
        items: items.map(({ productId, quantity, productType }) => {
          let price = {};
          if (productType === 'scooter' && scooterOrders.length > 0) {
            price = scooterOrders.reduce((acc, { id, priceId }) => {
              if (id === productId) return priceId;
              return acc;
            }, {});
          } else if (
            productType === 'accessory' &&
            accessoryOrders.length > 0
          ) {
            price = accessoryOrders.reduce((acc, { id, priceId }) => {
              if (id === productId) return priceId;
              return acc;
            }, {});
          }

          if (!Object.keys(price).length) {
            throw new NotFoundException(msg.ONE_OR_MORE_IDs_ARE_INVALID);
          }

          return this.orderItemRepository.create({
            // productName: price.name,
            price,
            productId,
            productType,
            quantity,
          });
        }),
      });

      newOrder.calculateFinalTotalPrice();

      console.log('newOrder: ', newOrder);

      return await this.orderRepository.save(newOrder);
    } catch (error: any) {
      nextError(error);
    }
  }

  public async getUserOrders(email: string, type: string): Promise<Order[]> {
    try {
      const user = await this.userService.findUserByEmail(email);
      if (!user) {
        throw new NotFoundException(msg.USER_NOT_FOUND);
      }

      console.log('productType: ', type);
      return await this.orderRepository
        .createQueryBuilder('order')
        .leftJoinAndSelect('order.items', 'order_item')
        .leftJoinAndSelect('order_item.price', 'price')
        .leftJoinAndSelect('order.user', 'user')
        .where('user.id =:userId', { userId: user.id })
        .andWhere('price.productType =:type', { type })
        .getMany();
      // return await this.orderRepository.find({
      //   where: {
      //     user: { id: user.id },
      //     items: {
      //       price: {
      //         productType: type,
      //       },
      //     },
      //   },
      //   relations: ['user', 'items', 'items.price'],
      // });
    } catch (error: any) {
      nextError(error);
    }
  }
}
