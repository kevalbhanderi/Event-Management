import { ApiProperty } from '@nestjs/swagger';
import { UserDocument } from 'src/modules/mongo/interface/users.interface';

export class UserDto {
  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly password: string;

  @ApiProperty()
  readonly userName: string;

  @ApiProperty()
  readonly firstName: string;

  @ApiProperty()
  readonly lastName: string;

  @ApiProperty()
  readonly birthday: string;

  @ApiProperty()
  readonly gender: string;

  @ApiProperty()
  readonly profileImageUrl: string;

  constructor(user: UserDocument) {
    this.email = user.email;
    this.firstName = user.first_name;
    this.lastName = user.last_name;
    this.birthday = user.date_of_birth;
    this.gender = user.gender;
    this.profileImageUrl = user.profile_image_url;
  }
}
