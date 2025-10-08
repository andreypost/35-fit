import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateUserJsonDto {
  @IsUUID()
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
