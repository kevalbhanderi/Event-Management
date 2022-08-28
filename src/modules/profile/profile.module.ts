import { Module } from '@nestjs/common';
import { JwtHelper } from 'src/utils/jwt.helper';
import { MongoService } from '../mongo/mongo.service';
import { ProfileMapper } from './mapper/profile.mapper';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService, ProfileMapper, MongoService, JwtHelper],
})
export class ProfileModule {}
