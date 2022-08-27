import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../register/dto/user.response.dto';
import { UserDocument } from 'src/modules/mongo/interface/users.interface';

export class LoginResponseDto extends UserDto {
  @ApiProperty()
  readonly token: string;

  constructor(user: UserDocument, userId: string, token: string) {
    super(user);

    this.token = token;
  }
}
