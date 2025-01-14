import {
  IsUUID,
  IsOptional,
  IsEnum,
  IsNotEmpty,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderItemDto } from './create.order.item.dto';

export class CreateOrderDto {
  @IsOptional()
  @IsUUID('4', { message: 'ID must be a valid UUID' })
  id?: string;

  @IsNotEmpty({ message: 'Order Status is required' })
  @IsEnum(['pending', 'shipped', 'delivered', 'cancelled'], {
    message: 'Status must be one of: Pending, Shipped, Delivered or Cancelled',
  })
  status!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items!: CreateOrderItemDto[];
}
