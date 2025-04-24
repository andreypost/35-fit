import {
  IsNotEmpty,
  IsOptional,
  IsUUID,
  IsNumber,
  Min,
  IsString,
  IsEnum,
} from 'class-validator';
import { msg } from 'src/constants/messages';

export class CreateScooterDto {
  @IsString({
    message: `${msg.SCOOTER_MODEL_IS_REQUIRED} and Model Name ${msg.MUST_BE_STRING}`,
  })
  model!: string;

  @IsUUID('4', { message: msg.ID_MUST_BE_UUID })
  priceId!: string;

  @IsOptional()
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message: `Scooter Rental price per day ${msg.MUST_BE_NUMBER}`,
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
