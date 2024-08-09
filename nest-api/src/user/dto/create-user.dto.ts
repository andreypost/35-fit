import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsInt,
  MinLength,
  IsUUID,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  age: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(4)
  @IsNotEmpty()
  password: string;
}

export class CreateUserDetailsDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsNotEmpty()
  earnings: string;

  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  name: string;
}
