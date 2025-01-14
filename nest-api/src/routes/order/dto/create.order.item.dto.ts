import { IsUUID, IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateOrderItemDto {
  @IsNotEmpty({ message: 'Price ID is required' })
  @IsUUID('4', { message: 'Price ID must be a valid UUID' })
  priceId!: string;

  @IsNotEmpty({ message: 'Order Quantity is required' })
  @Min(1, { message: 'Order Quantity must be at least 1' })
  @IsInt({ message: 'Order Quantity must be an integer' })
  quantity!: number;
}
