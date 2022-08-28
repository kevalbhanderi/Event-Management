import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class JoinEventRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  eventName: string;
}
