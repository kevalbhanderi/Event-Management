import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtTokenInterface } from 'src/interface/jwt.token.interface';
import { getErrorMessages, getSuccessMessages } from 'src/utils/response.message.helper';
import { EventDocument } from '../mongo/interface/event.interface';
import { UserDocument } from '../mongo/interface/users.interface';
import { MongoService } from '../mongo/mongo.service';
import { EventModel } from '../mongo/schema/event.schema';
import { EventRequestDto } from './dto/event.request.dto';
import { EventResponseDto } from './dto/event.response.dto';
import { JoinEventRequestDto } from './dto/join.event.request.dto';
import { EventMapper } from './mapper/event.mapper';

@Injectable()
export class EventService {
  constructor(
    private readonly mongoService: MongoService,
    private readonly eventMapper: EventMapper,
  ) {}

  /**
   * To create an event
   * @param eventRequestDto
   * @param caller
   * @returns
   */
  async create(eventRequestDto: EventRequestDto, caller: JwtTokenInterface) {
    const user = (await this.mongoService.userExists(caller.user_id)) as UserDocument;
    if (!user) {
      throw new BadRequestException(getErrorMessages().USER_NOT_EXISTS);
    }

    const event = (await this.eventMapper.buildEvent(eventRequestDto, caller)) as EventDocument;
    await this.mongoService.createEvent(event);

    return {
      data: new EventResponseDto(event),
      message: getSuccessMessages().EVENT_CREATED,
    };
  }

  /**
   * View all events
   * @param caller
   * @returns
   */
  async viewEvent(caller: JwtTokenInterface) {
    const user = (await this.mongoService.userExists(caller.user_id)) as UserDocument;
    if (!user) {
      throw new BadRequestException(getErrorMessages().USER_NOT_EXISTS);
    }

    const allEvents = await this.mongoService.getEvents();
    return allEvents;
  }

  /**
   * View all participants of events
   * @param caller
   * @returns
   */
  async eventParticipants(caller: JwtTokenInterface) {
    const user = (await this.mongoService.userExists(caller.user_id)) as UserDocument;
    if (!user) {
      throw new BadRequestException(getErrorMessages().USER_NOT_EXISTS);
    }

    const event = await this.mongoService.getEventByUser(caller.user_id);

    if (caller.user_id === event.event_creator) {
      return event.participants;
    }
    throw new BadRequestException(getErrorMessages().NOT_EVENT_CREATOR);
  }

  /**
   * To join an event
   * @param joinEventRequestDto
   */
  async joinEvent(joinEventRequestDto: JoinEventRequestDto, caller: JwtTokenInterface) {
    const user = (await this.mongoService.userExists(caller.user_id)) as UserDocument;
    if (!user) {
      throw new BadRequestException(getErrorMessages().USER_NOT_EXISTS);
    }

    const events = (await this.mongoService.getEvents()) as EventDocument[];
    events.map(async o => {
      if (o.participants.length === o.max_participants) {
        throw new BadRequestException(getErrorMessages().MAX_PARTICIPANTS);
      }
      if (o.title === joinEventRequestDto.eventName) {
        o.participants.push(caller.user_id);
        await new EventModel(o).save();
      } else {
        throw new BadRequestException(getErrorMessages().EVENT_NOT_EXISTS);
      }
    });
  }
}
