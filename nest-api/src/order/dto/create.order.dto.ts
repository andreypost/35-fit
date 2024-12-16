import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateOrderDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsNotEmpty()
  @Min(1, { message: 'Total amount must be at least 1' })
  @IsInt({ message: 'Count must be an integer' })
  totalAmount!: number;

  @IsNotEmpty()
  @IsEnum(['Pending', 'Shipped', 'Delivered', 'Cancelled'], {
    message: 'Status must be one of: Pending, Shipped, Delivered, Cancelled',
  })
  status!: string;
}
