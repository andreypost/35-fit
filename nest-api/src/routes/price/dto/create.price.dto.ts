import {
  IsNotEmpty,
  IsOptional,
  IsUUID,
  IsNumber,
  Min,
  Max,
  IsString,
  Length,
  IsIn,
} from 'class-validator';
import { msg } from '../../../constants/messages';

export class CreatePriceDto {
  // @IsOptional()
  // @IsUUID('4', { message: 'ID must be a valid UUID' })
  // id?: string;

  @IsNotEmpty({ message: 'Price Name is required' })
  @IsString({ message: 'Price Name must be a string' })
  name!: string;

  @IsNotEmpty({ message: 'Price Amount is required' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Price Amount must be a number with up to 2 decimal places' },
  )
  @Min(1, { message: 'Price Amount must be a positive number' })
  amount!: number;

  @IsOptional()
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Price Discount must be a number with up to 2 decimal places' },
  )
  @Min(0, { message: 'Price Discount must be at least 0' })
  @Max(100, { message: 'Price Discount cannot exceed 100%' })
  discount: number = 0;

  @IsOptional()
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Price Tax rate must be a number with up to 2 decimal places' },
  )
  @Min(0, { message: 'Price Tax rate must be at least 0' })
  @Max(100, { message: 'Price Tax rate cannot exceed 100%' })
  taxRate: number = 0;

  @IsNotEmpty({ message: 'Price Currency is required' })
  @IsString({ message: 'Price Currency must be a string' })
  @Length(3, 3, { message: 'Price Currency must be a 3-letter ISO code' })
  currency!: string;

  @IsNotEmpty({ message: 'Price Product Type is required' })
  @IsString({ message: 'Price Product Type must be a string' })
  @IsIn(['scooter', 'accessory'], {
    message: 'Price Product Type must be Scooter, Accessory',
  })
  productType!: string;
}

export class PriceNameQueryDto {
  @IsNotEmpty({ message: msg.PRICE_NAME_IS_REQUIRED })
  priceName!: string;
}
