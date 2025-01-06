import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateOrderDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsNotEmpty()
  @Min(1, { message: 'Order Quantity must be at least 1.' })
  @IsInt({ message: 'Count must be an integer.' })
  quantity!: number;

  @IsNotEmpty()
  @IsEnum(['Pending', 'Shipped', 'Delivered', 'Cancelled'], {
    message: 'Status must be one of: Pending, Shipped, Delivered, Cancelled.',
  })
  status!: string;

  @IsNotEmpty()
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Total Cost must be a number with up to 2 decimal places.' },
  )
  @IsPositive({ message: 'Total Cost must be a positive value.' })
  totalCost!: number;
}
