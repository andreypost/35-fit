import { IsNotEmpty } from 'class-validator';

export class CreateUserJsonDto {
  @IsNotEmpty()
  id?: number;

  @IsNotEmpty()
  earnings!: string;

  @IsNotEmpty()
  country!: string;

  @IsNotEmpty()
  name!: string;
}

export interface CsvUser {
  name: string;
  surname: string;
  gender: string;
  age: number;
  country: string;
  city: string;
  email: string;
  phone: string;
}
