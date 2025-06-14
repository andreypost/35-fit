import { IsUUID, IsInt, Min, IsEnum } from 'class-validator';

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
