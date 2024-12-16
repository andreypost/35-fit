import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AuthService } from '../user/auth.service';
// import { Response, Request } from 'express';
import { Order } from '../entities/order';
import { CreateOrderDto } from './dto/create.order.dto';
import { nextError } from '../helpers/next.error';
import { msg } from '../constants/messages';

@Injectable()
export class OrderService {
  constructor(
    private readonly authService: AuthService,
    @Inject('ORDER_REPOSITORY')
    private orderRepository: Repository<Order>,
  ) {}

  public async createUserOrder(
    createOrderDto: CreateOrderDto,
    email: string,
  ): Promise<Order> {
    try {
      const currentUser = await this.authService.findUserByEmail(email);
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
      const currentUser = await this.authService.findUserByEmail(email);
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
