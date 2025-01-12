import { Body, Controller, Get, Post } from '@nestjs/common';
import { CurrentUserEmail } from '../../utils/current.user.decorator';
import { OrderService } from './order.service';
// import { Response, Request } from 'express';
import { CreateOrderDto } from './dto/create.order.dto';
import { Order } from '../../entities/order';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create')
  async createUserOrder(
    @Body() createOrderDto: CreateOrderDto,
    @CurrentUserEmail() email: string,
  ): Promise<Order> {
    return this.orderService.createUserOrder(createOrderDto, email);
  }

  @Get('orders')
  async getUserOrders(@CurrentUserEmail() email: string): Promise<Order[]> {
    return this.orderService.getUserOrders(email);
  }
}
