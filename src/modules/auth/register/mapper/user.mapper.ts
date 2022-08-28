import { RegisterDto } from '../dto/register.dto';
import { generateMD5Hash } from '../../../../utils/password.helper';
import { UserDocument } from 'src/modules/mongo/interface/users.interface';

export class UserMapper {
  /**
   * Builds user basic data required to register
   */
  buildUser = async (payload: RegisterDto, profileImage): Promise<UserDocument> => {
    const user = {
      email: payload.email,
      password: payload.password ? await generateMD5Hash(payload.password) : '',
      first_name: payload.firstName || '',
      last_name: payload.lastName || '',
      date_of_birth: payload.birthday,
      gender: payload.gender || '',
      profile_image_url: profileImage['originalname'] || '',
    } as UserDocument;
    return user;
  };
}
