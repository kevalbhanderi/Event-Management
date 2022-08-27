import { BadRequestException, Injectable } from '@nestjs/common';
import { MongoService } from 'src/modules/mongo/mongo.service';
import { JwtHelper } from 'src/utils/jwt.helper';
import { generateMD5Hash } from 'src/utils/password.helper';
import { getErrorMessages } from 'src/utils/response.message.helper';
import { LoginRequestDto } from './dto/login.request.dto';
import { LoginResponseDto } from './dto/login.response.dto';

@Injectable()
export class LoginService {
  constructor(private readonly jwtHelper: JwtHelper, private readonly mongoService: MongoService) {}

  /**
   * User login through registered email & password
   * @param loginDto [email & password]
   */
  async login(loginDto: LoginRequestDto) {
    const user = await this.mongoService.userExists(loginDto.email)
    if (!user) {
      throw new BadRequestException(getErrorMessages().INVALID_CREDS);
    }

    const passwordHash = await generateMD5Hash(loginDto.password);
    if (passwordHash !== user.password) {
      throw new BadRequestException(getErrorMessages().INVALID_CREDS);
    }

    const tokenDto = { user_id: loginDto.email };
    const token = this.jwtHelper.generateToken(tokenDto);
    return new LoginResponseDto(user, user.email, token);
  }
}
