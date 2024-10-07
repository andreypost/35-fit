import { IsNotEmpty, IsUUID, IsOptional } from 'class-validator';

export class CreateUserDetailsDto {
  // @IsUUID()
  @IsOptional()
  id?: string;

  @IsNotEmpty()
  earnings!: string;

  @IsNotEmpty()
  country!: string;

  @IsNotEmpty()
  name!: string;
}
