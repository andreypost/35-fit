import { IsNotEmpty } from 'class-validator';

export class CreateUserJsonDto {
  @IsNotEmpty()
  id?: string;

  @IsNotEmpty()
  earnings!: string;

  @IsNotEmpty()
  country!: string;

  @IsNotEmpty()
  name!: string;
}

export class IdParamStringDto {
  @IsNotEmpty()
  id!: string;
}
