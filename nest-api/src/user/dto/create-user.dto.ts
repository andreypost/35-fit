import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class CreateUserDetailsDto {
  @IsNotEmpty()
  earnings: string;

  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  name: string;
}
