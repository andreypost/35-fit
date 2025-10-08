import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateAccessoryDto {
  @IsString({ message: 'Accessory Name must be a string' })
  @IsNotEmpty({ message: 'Accessory Name is required' })
  name!: string;

  @IsUUID('4', { message: 'Accessory Price ID must be a valid UUID' })
  priceId!: string;
}
