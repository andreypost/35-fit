import {
  IsNotEmpty,
  IsOptional,
  IsUUID,
  IsNumber,
  Min,
  Max,
  IsString,
  Length,
} from 'class-validator';

export class CreatePriceDto {
  @IsOptional()
  @IsUUID('4', { message: 'ID must be a valid UUID' })
  id?: string;

  @IsNotEmpty({ message: 'Amount is required' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Amount must be a number with up to 2 decimal places' },
  )
  @Min(0, { message: 'Amount must be a positive number' })
  amount!: number;

  @IsOptional()
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Discount must be a number with up to 2 decimal places' },
  )
  @Min(0, { message: 'Discount must be at least 0' })
  @Max(100, { message: 'Discount cannot exceed 100%' })
  discount: number = 0;

  @IsOptional()
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Tax rate must be a number with up to 2 decimal places' },
  )
  @Min(0, { message: 'Tax rate must be at least 0' })
  @Max(100, { message: 'Tax rate cannot exceed 100%' })
  taxRate: number = 0;

  @IsNotEmpty({ message: 'Currency is required' })
  @IsString({ message: 'Currency must be a string' })
  @Length(3, 3, { message: 'Currency must be a 3-letter ISO code' })
  currency!: string;
}
