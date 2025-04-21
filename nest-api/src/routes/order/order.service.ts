import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Scooter } from '../../entities/scooter';
import { Accessory } from '../../entities/accessory';
import { OrderItem } from '../../entities/order.item';
import { Order } from '../../entities/order';
import { UserService } from '../user/user.service';
import { CreateOrderItemDto } from './dto/create.order.item.dto';
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
  ): Promise<Order | void> {
    try {
      const currentUser = await this.userService.findUserByEmail(email);
      if (!currentUser) {
        throw new NotFoundException(msg.USER_NOT_FOUND);
      }

      const { status, items } = createOrderDto;

      const createOrderItems = async (
        productId: CreateOrderItemDto['productId'],
        productType: CreateOrderItemDto['productType'],
        quantity: CreateOrderItemDto['quantity'],
      ): Promise<any> => {
        let product = null;
        if (productType === 'scooter') {
          // product = await this.scooterRepository.findOne({
          //   where: { id: productId },
          //   relations: ['price'],
          // });

          product = await this.scooterRepository
            .createQueryBuilder('scooter')
            .leftJoinAndSelect('scooter.price', 'price')
            .where('scooter.id = :id', { id: productId })
            .getOne();
        } else if (productType === 'accessory') {
          // product = await this.accessoryRepository.findOne({
          //   where: { id: productId },
          //   relations: ['price'],
          // });

          product = await this.accessoryRepository
            .createQueryBuilder('accessory')
            .leftJoinAndSelect('accessory.price', 'price')
            .where('accessory.id = :id', { id: productId })
            .getOne();
        }

        if (!product) {
          throw new NotFoundException(msg.ORDER_NOT_FOUND);
        }

        if (!product.price) {
          throw new Error(
            `Product with ID ${productId} has no price assigned.`,
          );
        }

        return {
          price: product.price,
          productId: product.id,
          productName: product.model || product.name,
          productType,
          quantity,
        };
      };

      const orderItems = await Promise.all(
        items.map(async ({ productId, productType, quantity }) =>
          createOrderItems(productId, productType, quantity),
        ),
      );

      const newOrder = this.orderRepository.create({
        status,
        user: currentUser,
        items: orderItems.map(
          ({ price, productId, productName, productType, quantity }) => {
            return this.orderItemRepository.create({
              price,
              productId,
              productName,
              productType,
              quantity,
            });
          },
        ),
      });

      newOrder.calculateFinalTotalPrice();

      return await this.orderRepository.save(newOrder);
    } catch (error: any) {
      nextError(error);
    }
  }

  public async getUserOrders(
    email: string,
    type: string,
  ): Promise<Order[] | void> {
    try {
      const currentUser = await this.userService.findUserByEmail(email);
      if (!currentUser) {
        throw new NotFoundException(msg.USER_NOT_FOUND);
      }

      return await this.orderRepository
        .createQueryBuilder('order')
        .leftJoinAndSelect('order.items', 'order_item')
        .leftJoinAndSelect('order_item.price', 'price')
        .leftJoinAndSelect('order.user', 'user')
        .where('user.id =:userId', { userId: currentUser.id })
        .andWhere('price.productType =:type', { type })
        .getMany();
    } catch (error: any) {
      nextError(error);
    }
  }
}
