import {
  IsEnum,
  IsArray,
  ValidateNested,
  IsUUID,
  IsInt,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @IsEnum(['pending', 'shipped', 'delivered', 'cancelled', 'done'], {
    message:
      'Order Status is required and must be one of: pending, shipped, delivered, cancelled or done',
  })
  status!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items!: CreateOrderItemDto[];
}

export class CreateOrderItemDto {
  @IsEnum(['scooter', 'accessory'], {
    message:
      'Order Product Type is required and must be either scooter or accessory',
  })
  productType!: string;

  @IsUUID('4', {
    message: 'Order Product ID is required and must be a valid UUID',
  })
  productId!: string;

  @IsInt({ message: 'Order Quantity must be an integer number and at least 1' })
  @Min(1)
  quantity!: number;
}
