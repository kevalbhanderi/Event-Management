import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { TransformInterceptor } from 'src/dispatchers/transform.interceptor';
import { editFileName, imageFileFilter } from 'src/utils/profile.image.helper';
import { RegisterDto } from './dto/register.dto';
import { RegisterService } from './register.service';

@Controller('/api/v1')
@ApiTags('Register')
@UseInterceptors(TransformInterceptor)
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @ApiOperation({ summary: 'Register into system' })
  @ApiOkResponse({ description: 'Success' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post('register')
  @UseInterceptors(
    FileInterceptor('profileImageUrl', {
      storage: diskStorage({
        destination: './src/public/uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter
    }),
  )
  async register(@Body() registerDto: RegisterDto, @UploadedFile() profileImage) {
    const { data, message } = await this.registerService.register(registerDto, profileImage);
    return { data, message };
  }
}
