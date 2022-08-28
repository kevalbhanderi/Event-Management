import { Module } from '@nestjs/common';
import { JwtHelper } from 'src/utils/jwt.helper';
import { MongoService } from '../mongo/mongo.service';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { EventMapper } from './mapper/event.mapper';

@Module({
  controllers: [EventController],
  providers: [EventService, MongoService, EventMapper, JwtHelper],
})
export class EventModule {}
