import { Body, Controller, Get, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from 'src/decorator/user.decorator';
import { TransformInterceptor } from 'src/dispatchers/transform.interceptor';
import { AuthGuard } from 'src/guard/auth.guard';
import { JwtTokenInterface } from 'src/interface/jwt.token.interface';
import { EventRequestDto } from './dto/event.request.dto';
import { JoinEventRequestDto } from './dto/join.event.request.dto';
import { EventService } from './event.service';

@Controller('/api/v1/event')
@ApiTags('Event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(TransformInterceptor)
  @ApiOperation({ summary: 'Api to create event' })
  @ApiOkResponse({ description: 'success' })
  @ApiBadRequestResponse({ description: 'Invalid user id / Invalid password' })
  @ApiUnauthorizedResponse({ description: 'Login required' })
  @Post()
  async event(@Body() eventRequestDto: EventRequestDto, @User() caller: JwtTokenInterface) {
    const { data, message } = await this.eventService.create(eventRequestDto, caller);
    return { data, message };
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(TransformInterceptor)
  @ApiOperation({ summary: 'Api to view all event' })
  @ApiOkResponse({ description: 'success' })
  @ApiBadRequestResponse({ description: 'Invalid user id / Invalid password' })
  @ApiUnauthorizedResponse({ description: 'Login required' })
  @Get()
  async viewEvent(@User() caller: JwtTokenInterface) {
    const data = await this.eventService.viewEvent(caller);
    return { data, message: '' };
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(TransformInterceptor)
  @ApiOperation({ summary: 'Api to view event participants' })
  @ApiOkResponse({ description: 'success' })
  @ApiBadRequestResponse({ description: 'Invalid user id / Invalid password' })
  @ApiUnauthorizedResponse({ description: 'Login required' })
  @Get('participants')
  async eventParticipants(@User() caller: JwtTokenInterface) {
    const data = await this.eventService.eventParticipants(caller);
    return { data, message: '' };
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(TransformInterceptor)
  @ApiOperation({ summary: 'Api to join event' })
  @ApiOkResponse({ description: 'success' })
  @ApiBadRequestResponse({ description: 'Invalid user id / Invalid password' })
  @ApiUnauthorizedResponse({ description: 'Login required' })
  @Post('join')
  async joinEvent(
    @Body() joinEventRequestDto: JoinEventRequestDto,
    @User() caller: JwtTokenInterface,
  ) {
    const data = await this.eventService.joinEvent(joinEventRequestDto, caller);
    return { data, message: 'You have successfully participate in event' };
  }
}
