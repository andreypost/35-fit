import { IsUUID, IsInt, IsNotEmpty, Min, IsEnum } from 'class-validator';

export class CreateOrderItemDto {
  @IsNotEmpty({ message: 'Order Product Type is required' })
  @IsEnum(['scooter', 'accessory'], {
    message: 'Order Product Type must be scooter or accessory',
  })
  productType!: string;

  @IsNotEmpty({ message: 'Order Product ID is required' })
  @IsUUID('4', { message: 'Order  Product ID must be a valid UUID' })
  productId!: string;

  @IsNotEmpty({ message: 'Order Quantity is required' })
  @IsInt({ message: 'Order Quantity must be an integer' })
  @Min(1, { message: 'Order Quantity must be at least 1' })
  quantity!: number;
}
