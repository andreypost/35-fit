import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateAccessoryDto {
  @IsNotEmpty({ message: 'Accessory Name is required' })
  @IsString({ message: 'Accessory Name must be a string' })
  name!: string;

  @IsNotEmpty({ message: 'Accessory Price ID is required' })
  @IsUUID('4', { message: 'Accessory Price ID must be a valid UUID' })
  priceId!: string;
}
