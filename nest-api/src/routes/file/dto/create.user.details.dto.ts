import { IsNotEmpty } from 'class-validator';

export class CreateUserDetailsDto {
  @IsNotEmpty()
  id?: string;

  @IsNotEmpty()
  earnings!: string;

  @IsNotEmpty()
  country!: string;

  @IsNotEmpty()
  name!: string;
}
