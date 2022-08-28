import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString, Matches, MaxLength } from 'class-validator';

export class EventRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100, { message: 'EVENT_DESC' })
  description: string;

  @ApiPropertyOptional({ title: 'Event Date' })
  @IsString()
  @IsNotEmpty()
  @Matches(/\d\d\d\d\/\d\d\/\d\d/, { message: 'EVENT_DATE must be like yyyy/mm/dd this' })
  eventDate: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'EVENT_TIME must be like hh/mm this',
  })
  eventTime: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  place: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  maxParticipants: number;
}
