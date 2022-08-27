import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDocument } from 'src/modules/mongo/interface/users.interface';
import { MongoService } from 'src/modules/mongo/mongo.service';
import { JwtHelper } from 'src/utils/jwt.helper';
import { getErrorMessages, getSuccessMessages } from 'src/utils/response.message.helper';
import { RegisterDto } from './dto/register.dto';
import { UserDto } from './dto/user.response.dto';
import { UserMapper } from './mapper/user.mapper';

@Injectable()
export class RegisterService {
  constructor(
    private readonly mongoService: MongoService,
    private readonly userMapper: UserMapper,
    private readonly jwtHelper: JwtHelper,
  ) {}

  /**
   * It registers a user
   * Only unique emails are allowed
   * @param registerDto Required user details
   */
  async register(registerDto: RegisterDto, avatar) {
    const emailExists = await this.mongoService.userExists(registerDto.email);
    if (emailExists) {
      throw new BadRequestException(getErrorMessages().USER_EXISTS);
    }

    const userDetails = await this.buildAndSaveUser(registerDto, avatar);

    return {
      data: new UserDto(userDetails.user),
      message: getSuccessMessages().USER_REGISTERED,
    };
  }

  /**
   * To fetch and store user details on registration
   * @param registerDto
   */
  async buildAndSaveUser(
    registerDto: RegisterDto, avatar
  ): Promise<{ user: UserDocument; jwtToken: string }> {
    const tokenDto = { user_id: registerDto.email };
    const user = await this.userMapper.buildUser(registerDto, avatar);
    const jwtToken = this.jwtHelper.generateToken(tokenDto);

    user.profile_image_url = user.profile_image_url['originalname']
    await this.mongoService.saveUser(user);

    return { user: user, jwtToken };
  }
}
