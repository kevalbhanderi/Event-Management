import { Module } from '@nestjs/common';
import { MongoService } from 'src/modules/mongo/mongo.service';
import { JwtHelper } from 'src/utils/jwt.helper';
import { UserMapper } from './mapper/user.mapper';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';

@Module({
  controllers: [RegisterController],
  providers: [RegisterService, MongoService, UserMapper, JwtHelper]
})
export class RegisterModule {}
