import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, IsNotEmpty, Matches, IsEnum } from 'class-validator';
import { Gender } from 'src/config/constants';

export class UserProfileUpdateRequestDto {
  @ApiPropertyOptional({ title: 'First name' })
  @IsOptional()
  @IsString({ message: 'FIRST_NAME' })
  @MaxLength(30, { message: 'FIRST_NAME' })
  firstName: string;

  @ApiPropertyOptional({ title: 'Last name' })
  @IsOptional()
  @IsString({ message: 'LAST_NAME' })
  @MaxLength(30, { message: 'LAST_NAME' })
  lastName: string;

  @ApiPropertyOptional({ title: 'Date of Birth' })
  @IsOptional()
  @IsNotEmpty({ message: 'BIRTHDAY_FORMAT' })
  @Matches(/\d\d\/\d\d\/\d\d\d\d/, { message: 'BIRTHDAY_FORMAT' })
  birthday: string;

  @ApiPropertyOptional({ title: 'Gender', enum: Gender })
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: string;

  @ApiPropertyOptional({ title: 'Profile-Picture url' })
  @IsOptional()
  profileImageurl: string;
}
