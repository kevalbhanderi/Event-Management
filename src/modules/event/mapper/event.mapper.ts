import { JwtTokenInterface } from 'src/interface/jwt.token.interface';
import { EventDocument } from 'src/modules/mongo/interface/event.interface';
import { EventRequestDto } from '../dto/event.request.dto';

export class EventMapper {
  /**
   * Map an event details
   * @param payload
   * @param caller
   * @returns
   */
  buildEvent = async (
    payload: EventRequestDto,
    caller: JwtTokenInterface,
  ): Promise<EventDocument> => {
    const event = {
      event_creator: caller.user_id,
      title: payload.title,
      description: payload.description,
      event_date: payload.eventDate,
      event_time: payload.eventTime,
      place: payload.place,
      participants: [],
      max_participants: payload.maxParticipants,
    } as EventDocument;
    return event;
  };
}
