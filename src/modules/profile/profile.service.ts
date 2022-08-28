import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtTokenInterface } from 'src/interface/jwt.token.interface';
import { getErrorMessages, getSuccessMessages } from 'src/utils/response.message.helper';
import { UserDto } from '../auth/register/dto/user.response.dto';
import { MongoService } from '../mongo/mongo.service';
import { UserProfileUpdateRequestDto } from './dto/profile.update.request.dto';
import { ProfileMapper } from './mapper/profile.mapper';

@Injectable()
export class ProfileService {
  constructor(
    private readonly profileMapper: ProfileMapper,
    private readonly mongoService: MongoService,
  ) {}

  /**
   * To get user's profile
   * @param caller
   * @returns
   */
  async profile(caller: JwtTokenInterface): Promise<UserDto> {
    const user = await this.mongoService.userExists(caller.user_id);
    if (!user) {
      throw new BadRequestException(getErrorMessages().USER_NOT_EXISTS);
    }

    return new UserDto(user);
  }

  /**
   * To update a user's profile
   * @param caller
   * @param request
   * @returns
   */
  async profileUpdate(
    caller: JwtTokenInterface,
    request: UserProfileUpdateRequestDto,
    profileImageUrl,
  ) {
    const user = await this.mongoService.userExists(caller.user_id);
    if (!user) {
      throw new BadRequestException(getErrorMessages().USER_NOT_EXISTS);
    }

    const newUser = await this.profileMapper.mapUserProfileUpdate(request, user, profileImageUrl);
    await this.mongoService.updateProfile(newUser);

    return {
      data: new UserDto(newUser),
      message: getSuccessMessages().PROFILE_UPDATED,
    };
  }
}
