import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserJsonDto {
  @IsNumber()
  id!: number;

  @IsString()
  @IsNotEmpty()
  earnings!: string;

  @IsString()
  @IsNotEmpty()
  country!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;
}
