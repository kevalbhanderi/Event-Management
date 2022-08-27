import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/dispatchers/transform.interceptor';
import { SuccessResponse } from 'src/interface/success.response.interface';
import { LoginRequestDto } from './dto/login.request.dto';
import { LoginResponseDto } from './dto/login.response.dto';
import { LoginService } from './login.service';

@Controller('/api/v1')
@ApiTags('Login')
@UseInterceptors(TransformInterceptor)
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @ApiOperation({ summary: 'Login into the system' })
  @ApiOkResponse({ description: 'Success', type: LoginResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid id or password' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post('/login')
  async login(@Body() loginDto: LoginRequestDto): Promise<SuccessResponse<LoginRequestDto>> {
    const data = await this.loginService.login(loginDto);
    return { data };
  }
}
