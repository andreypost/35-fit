import {
  IsUUID,
  IsOptional,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  Min,
  IsString,
} from 'class-validator';

export class CreateOrderDto {
  @IsOptional()
  @IsUUID('4', { message: 'ID must be a valid UUID' })
  id?: string;

  @IsNotEmpty({ message: 'Order Quantity is required' })
  @Min(1, { message: 'Order Quantity must be at least 1' })
  @IsInt({ message: 'Order Quantity must be an integer' })
  quantity!: number;

  @IsNotEmpty({ message: 'Order Status is required' })
  @IsEnum(['pending', 'shipped', 'delivered', 'cancelled'], {
    message: 'Status must be one of: Pending, Shipped, Delivered, Cancelled',
  })
  status!: string;

  @IsNotEmpty({ message: 'Order Name is required' })
  @IsString({ message: 'Order Name must be a string' })
  modalName!: string;
  // @IsNotEmpty({ message: 'Order Status is required' })
  // @IsNumber(
  //   { maxDecimalPlaces: 2 },
  //   { message: 'Total Cost must be a number with up to 2 decimal places' },
  // )
  // @IsPositive({ message: 'Total Cost must be a positive value' })
  // finalTotalPrice!: number;
}
