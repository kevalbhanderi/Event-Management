import {
  Body,
  Controller,
  Get,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { User } from 'src/decorator/user.decorator';
import { TransformInterceptor } from 'src/dispatchers/transform.interceptor';
import { AuthGuard } from 'src/guard/auth.guard';
import { JwtTokenInterface } from 'src/interface/jwt.token.interface';
import { editFileName, imageFileFilter } from 'src/utils/profile.image.helper';
import { UserDto } from '../auth/register/dto/user.response.dto';
import { UserProfileUpdateRequestDto } from './dto/profile.update.request.dto';
import { ProfileService } from './profile.service';

@Controller('/api/v1/profile')
@ApiTags('Profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(TransformInterceptor)
  @ApiOperation({ summary: 'API to get user profile' })
  @ApiOkResponse({ description: 'success', type: UserDto })
  @ApiBadRequestResponse({ description: 'Invalid user id / Invalid password' })
  @ApiUnauthorizedResponse({ description: 'Login required' })
  @Get()
  async profile(@User() caller: JwtTokenInterface) {
    const data = await this.profileService.profile(caller);
    return { data };
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(TransformInterceptor)
  @ApiOperation({ summary: 'API to update user profile' })
  @ApiOkResponse({ description: 'success', type: UserDto })
  @ApiBadRequestResponse({ description: 'Invalid user id / Invalid password' })
  @ApiUnauthorizedResponse({ description: 'Login required' })
  @Put()
  @UseInterceptors(
    FileInterceptor('profileImageUrl', {
      storage: diskStorage({
        destination: './src/public/uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async profileUpdate(
    @User() caller: JwtTokenInterface,
    @Body() request: UserProfileUpdateRequestDto,
    @UploadedFile() profileImageUrl,
  ) {
    const { data, message } = await this.profileService.profileUpdate(
      caller,
      request,
      profileImageUrl,
    );
    return { data, message };
  }
}
