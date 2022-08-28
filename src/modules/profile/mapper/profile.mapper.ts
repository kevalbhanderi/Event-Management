import { UserDocument } from 'src/modules/mongo/interface/users.interface';
import { UserProfileUpdateRequestDto } from '../dto/profile.update.request.dto';

export class ProfileMapper {
  /**
   * Maps user-profile data to be stored in db
   * @param payload new requested profile details
   * @param user old user details that exists in db
   */
  mapUserProfileUpdate = async (
    payload: UserProfileUpdateRequestDto,
    user: UserDocument,
    profileImageUrl,
  ): Promise<UserDocument> => {
    const profile = {
      password: user.password,
      email: user.email,
      first_name: payload.firstName || user.first_name,
      last_name: payload.lastName || user.last_name,
      date_of_birth: payload.birthday || user.date_of_birth,
      gender: payload.gender || user.gender,
      profile_image_url: profileImageUrl['originalname'] || user.profile_image_url,
    } as UserDocument;
    return profile;
  };
}
