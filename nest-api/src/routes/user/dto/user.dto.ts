import {
  IsNotEmpty,
  IsEmail,
  IsInt,
  MinLength,
  IsUUID,
  IsOptional,
  IsIn,
  // IsPhoneNumber,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { PickType } from '@nestjs/mapped-types';
import { msg } from 'src/constants/messages';

export class CreateUserDto {
  // @IsUUID()
  // @IsOptional()
  // id?: string;

  @IsNotEmpty({ message: msg.NAME_IS_REQUIRED })
  name!: string;

  @IsNotEmpty({ message: msg.SURNAME_IS_REQUIRED })
  surname!: string;

  @IsNotEmpty({ message: msg.GENDER_IS_REQUIRED })
  @IsIn(['nonBinary', 'male', 'female'], {
    message: 'Gender must be nonBinary, male, or female',
  })
  gender!: string;

  @IsInt()
  @IsNotEmpty({ message: msg.VALID_AGE_REQUIRED })
  @Transform(({ value }) => Number(value))
  age!: number;

  @IsNotEmpty({ message: msg.COUNTRY_IS_REQUIRED })
  country!: string;

  @IsNotEmpty({ message: msg.CITY_IS_REQUIRED })
  city!: string;

  @IsEmail(undefined, { message: msg.VALID_EMAIL_IS_REQUIRED })
  @IsNotEmpty({ message: msg.EMAIL_ALREADY_EXIST })
  email!: string;

  @MinLength(4, { message: msg.PASSWORD_MUTS_BE_AT_LEAST })
  @IsNotEmpty({ message: msg.PASSWORD_IS_REQUIRED })
  password!: string;

  @IsNotEmpty({ message: msg.PLEASE_ENTER_A_VALID_PHONE })
  // @IsPhoneNumber('UA', { message: 'Phone number must be a valid number' })
  // @IsPhoneNumber('US', { message: 'Phone number must be a valid number' })
  // @IsPhoneNumber('PL', { message: 'Phone number must be a valid number' })
  // @IsPhoneNumber(null)
  phone!: string;

  @IsOptional()
  emergencyName?: string;

  @IsOptional()
  emergencyPhone?: string;

  @IsOptional()
  keepLoggedIn?: boolean;
}

export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
  'keepLoggedIn',
] as const) {}

export class RolesPrivilegesDto {
  @IsNotEmpty({ message: msg.GRANTED_PRINILEGES })
  grantedPrivileges!: number;

  @IsNotEmpty({ message: msg.DENIED_PRINILEGES })
  deniedPrivileges!: number;
}

export class SearchQueryDto {
  @IsNotEmpty({ message: msg.SEARCH_QUERY_IS_REQUIRED })
  searchQuery!: string;
}
