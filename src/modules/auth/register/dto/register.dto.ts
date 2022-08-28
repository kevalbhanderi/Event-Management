import {
  IsEmail,
  IsNotEmpty,
  Matches,
  IsString,
  MaxLength,
  IsEnum,
  MinLength,
  IsLowercase,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Gender } from 'src/config/constants';

export class RegisterDto {
  @ApiProperty({ title: 'User unique email-id' })
  @IsEmail({}, { message: 'LOGIN_EMAIL' })
  @IsLowercase({ message: 'USER_EMAIL' })
  @IsNotEmpty({ message: 'LOGIN_EMAIL' })
  email: string;

  @ApiProperty({ title: 'User password' })
  @IsNotEmpty({ message: 'LOGIN_PASSWORD' })
  @MinLength(6, { message: 'WEAK_PASSWORD' })
  @MaxLength(24, { message: 'WEAK_PASSWORD' })
  @Matches(
    /^(?=.{6,})(?!.*[\s])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.+[`~()',;_\[\]|\\/.<>?:"{}@#$%^&+*!=-]).*$/,
    {
      message: 'WEAK_PASSWORD',
    },
  )
  password: string;

  @ApiPropertyOptional({ title: 'First name' })
  @IsNotEmpty({ message: 'EMPTY_FIRST_NAME' })
  @IsString({ message: 'FIRST_NAME' })
  @MaxLength(30, { message: 'FIRST_NAME' })
  firstName: string;

  @ApiPropertyOptional({ title: 'Last name' })
  @IsNotEmpty({ message: 'EMPTY_LAST_NAME' })
  @IsString({ message: 'LAST_NAME' })
  @MaxLength(30, { message: 'LAST_NAME' })
  lastName: string;

  @ApiPropertyOptional({ title: 'Date of Birth' })
  @IsNotEmpty({ message: 'EMPTY_BIRTHDATE' })
  @Matches(/\d\d\/\d\d\/\d\d\d\d/, { message: 'BIRTHDAY_FORMAT must be like dd/mm/yyyy this' })
  birthday: string;

  @ApiPropertyOptional({ title: 'Gender', enum: Gender })
  @IsNotEmpty({ message: 'EMPTY_GENDER' })
  @IsEnum(Gender)
  gender: string;

  @ApiPropertyOptional({ title: 'Profile-Picture url' })
  profileImageUrl: string;
}
