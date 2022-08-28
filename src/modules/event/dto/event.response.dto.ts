import { ApiProperty } from '@nestjs/swagger';
import { EventDocument } from 'src/modules/mongo/interface/event.interface';

export class EventResponseDto {
  @ApiProperty()
  readonly eventCreator: string;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly eventDate: string;

  @ApiProperty()
  readonly eventTime: string;

  @ApiProperty()
  readonly place: string;

  @ApiProperty()
  readonly participants: string[];

  @ApiProperty()
  readonly maxParticipants: number;

  constructor(event: EventDocument) {
    this.eventCreator = event.event_creator;
    this.title = event.title;
    this.description = event.description;
    this.eventDate = event.event_date;
    this.eventTime = event.event_time;
    this.place = event.place;
    this.participants = event.participants;
    this.maxParticipants = event.max_participants;
  }
}
