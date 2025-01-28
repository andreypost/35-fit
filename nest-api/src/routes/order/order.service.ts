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
  ): Promise<Order> {
    try {
      const user = await this.userService.findUserByEmail(email);
      if (!user) {
        throw new NotFoundException(msg.USER_NOT_FOUND);
      }

      const { status, items } = createOrderDto;

      const createOrderItems = async (
        quantity: CreateOrderItemDto['quantity'],
        productId: CreateOrderItemDto['productId'],
        productType: CreateOrderItemDto['productType'],
      ): Promise<any> => {
        let product = null;
        if (productType === 'scooter') {
          product = await this.scooterRepository.find({
            where: { id: productId },
            relations: ['priceId'],
          });
        } else if (productType === 'accessory') {
          product = await this.accessoryRepository.find({
            where: { id: productId },
            relations: ['priceId'],
          });
        }

        if (!product?.length) {
          throw new NotFoundException(msg.ORDER_NOT_FOUND);
        }
        product = product[0];
        product.productId = product.id;
        product.productName = product.model || product.name;
        product.productType = productType;
        product.quantity = quantity;

        return product;
      };

      const orderItems = await Promise.all(
        items.map(async ({ quantity, productId, productType }) =>
          createOrderItems(quantity, productId, productType),
        ),
      );

      const newOrder = this.orderRepository.create({
        status,
        user,
        items: orderItems.map(
          ({ productId, priceId, productName, productType, quantity }) => {
            return this.orderItemRepository.create({
              productId,
              price: priceId,
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
    } catch (error: any) {
      nextError(error);
    }
  }
}
