import {
  IsNotEmpty,
  IsOptional,
  IsUUID,
  IsNumber,
  Min,
  IsString,
  IsEnum,
} from 'class-validator';

export class CreateScooterDto {
  // @IsOptional()
  // @IsUUID('4', { message: 'ID must be a valid UUID' })
  // id?: string;

  @IsNotEmpty({ message: 'Scooter Model is required' })
  @IsString({ message: 'Scooter Model must be a string' })
  model!: string;

  @IsNotEmpty({ message: 'Scooter Price ID is required' })
  @IsUUID('4', { message: 'Scooter Price ID must be a valid UUID' })
  priceId!: string;

  @IsOptional()
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message:
        'Scooter Rental Price Per Day must be a number with up to 2 decimal places',
    },
  )
  @Min(0, { message: 'Scooter Rental Price Per Day must be a positive number' })
  rentalPricePerDay?: number;

  @IsOptional()
  @IsString({ message: 'Scooter Sale Type must be a string' })
  @IsEnum(['sale', 'rental'], {
    message: 'Scooter Sale Type must be one of: Sale or Rental',
  })
  saleType?: string = 'sale';
}
