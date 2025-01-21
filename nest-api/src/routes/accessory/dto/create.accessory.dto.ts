import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAccessoryDto {
  @IsOptional()
  @IsUUID('4', { message: 'ID must be a valid UUID' })
  id?: string;

  @IsNotEmpty({ message: 'Accessory Name is required' })
  @IsString({ message: 'Accessory Name must be a string' })
  name!: string;

  @IsNotEmpty({ message: 'Scooter Price ID is required' })
  @IsUUID('4', { message: 'Scooter Price ID must be a valid UUID' })
  priceId!: string;
}
