import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsEmail,
  IsInt,
  MinLength,
  IsUUID,
  IsOptional,
  IsIn,
  IsPhoneNumber,
} from 'class-validator';
import { PickType } from '@nestjs/mapped-types';

export class CreateUserDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  surname!: string;

  @IsNotEmpty()
  @IsIn(['nonBinary', 'male', 'femail'])
  gender!: string;

  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  age!: number;

  @IsNotEmpty()
  country!: string;

  @IsNotEmpty()
  city!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @MinLength(4)
  @IsNotEmpty()
  password!: string;

  @IsNotEmpty()
  // @IsPhoneNumber('UA', { message: 'Phone number must be a valid number' })
  // @IsPhoneNumber('US', { message: 'Phone number must be a valid number' })
  // @IsPhoneNumber('PL', { message: 'Phone number must be a valid number' })
  // @IsPhoneNumber(null)
  phone!: string;

  @IsOptional()
  emergencyName?: string;

  @IsOptional()
  emergencyPhone?: string;
}

export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
] as const) {}

export class DeleteUserDto extends PickType(CreateUserDto, [
  'email',
] as const) {}
