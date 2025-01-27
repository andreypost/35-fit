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
import { Price } from '../../entities/price';

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
      const productIds = items.map(({ productId }) => productId);

      const [scooterOrders, accessoryOrders] = await Promise.all([
        this.scooterRepository.find({
          where: { id: In(productIds) },
          relations: ['priceId'],
        }),
        this.accessoryRepository.find({
          where: { id: In(productIds) },
          relations: ['priceId'],
        }),
      ]);

      console.log('scooterOrders: ', scooterOrders);
      console.log('accessoryOrders: ', accessoryOrders);

      /* accessoryOrders [
        Accessory {
          id: '2bde737a-394d-432f-9a99-4f1ca8ad8db8',
          name: 'Halmet White',
          createdAt: 2025-01-27T20:10:40.248Z,
          updatedAt: 2025-01-27T20:10:40.248Z,
          priceId: Price {
            discount: '15.00',
            taxRate: '5.00',
            id: '42309574-00e1-47b4-97f6-19ff6e00cf22',
            name: 'Autumn Offer 2025',
            amount: '99.00',
            currency: 'USD',
            productType: 'accessory'
          }
        }
      ] */

      if (
        productIds.length !==
        scooterOrders.length + accessoryOrders?.length
      ) {
        throw new NotFoundException(msg.ONE_OR_MORE_IDs_ARE_INVALID);
      }

      const scooterMap = new Map(
        scooterOrders.map((scooter) => [scooter.id, scooter]),
      );
      const accessoryMap = new Map(
        accessoryOrders.map((accessory) => [accessory.id, accessory]),
      );

      const newOrder = this.orderRepository.create({
        status,
        user,
        items: items.map(({ productId, quantity, productType }) => {
          let productName: string;
          let price: Price;

          if (productType === 'scooter') {
            const scooter = scooterMap.get(productId);
            if (!scooter) {
              throw new NotFoundException(msg.ONE_OR_MORE_IDs_ARE_INVALID);
            }
            productName = scooter.model;
            price = scooter.priceId;
          } else if (productType === 'accessory') {
            const accessory = accessoryMap.get(productId);
            if (!accessory) {
              throw new NotFoundException(msg.ONE_OR_MORE_IDs_ARE_INVALID);
            }
            productName = accessory.name;
            price = accessory.priceId;
          } else {
            throw new NotFoundException('msg.INVALID_PRODUCT_TYPE');
          }

          return this.orderItemRepository.create({
            productName,
            price,
            productId,
            productType,
            quantity,
          });
        }),
      });

      /*       const newOrder = this.orderRepository.create({
        status,
        user,
        items: items.map(({ productId, quantity, productType }) => {
          let price: Price = null;
          let productName: string = '';
          if (productType === 'scooter' && scooterOrders.length > 0) {
            price = scooterOrders.reduce<Price>(
              (acc, { id, model, priceId }) => {
                if (id === productId) {
                  productName = model;
                  return priceId;
                }
                return acc;
              },
              null,
            );
          } else if (
            productType === 'accessory' &&
            accessoryOrders.length > 0
          ) {
            price = accessoryOrders.reduce((acc, { id, name, priceId }) => {
              if (id === productId) {
                productName = name;
                return priceId;
              }
              return acc;
            }, {} as Price);
          }

          if (!price) {
            throw new NotFoundException(msg.ONE_OR_MORE_IDs_ARE_INVALID);
          }

          return this.orderItemRepository.create({
            productName,
            price,
            productId,
            productType,
            quantity,
          });
        }),
      }); */

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
