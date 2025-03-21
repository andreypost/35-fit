import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CurrentUserEmail } from '../../pipes/current.user.email';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create.order.dto';
import { Order } from '../../entities/order';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create')
  @ApiOperation({ summary: 'create' })
  async createUserOrder(
    @Body() createOrderDto: CreateOrderDto,
    @CurrentUserEmail() email: string,
  ): Promise<Order> {
    return await this.orderService.createUserOrder(createOrderDto, email);
  }

  @Get('orders/:type')
  @ApiOperation({ summary: 'orders/:type' })
  async getUserOrders(
    @Param('type') type: string,
    @CurrentUserEmail() email: string,
  ): Promise<Order[]> {
    return await this.orderService.getUserOrders(email, type);
  }
}
