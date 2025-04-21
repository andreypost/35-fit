import { IsEnum, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderItemDto } from './create.order.item.dto';

export class CreateOrderDto {
  @IsEnum(['pending', 'shipped', 'delivered', 'cancelled'], {
    message:
      'Order Status is required and must be one of: pending, shipped, delivered, or cancelled',
  })
  status!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items!: CreateOrderItemDto[];
}
