import { Module } from '@nestjs/common';
import { MongoService } from 'src/modules/mongo/mongo.service';
import { JwtHelper } from 'src/utils/jwt.helper';
import { UserMapper } from '../register/mapper/user.mapper';
import { RegisterService } from '../register/register.service';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  controllers: [LoginController],
  providers: [LoginService, RegisterService, MongoService, UserMapper, JwtHelper],
})
export class LoginModule {}
