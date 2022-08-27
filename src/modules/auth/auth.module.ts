import { Module } from '@nestjs/common';
import { RegisterModule } from './register/register.module';
import { LoginService } from './login/login.service';
import { LoginController } from './login/login.controller';
import { LoginModule } from './login/login.module';
import { JwtHelper } from 'src/utils/jwt.helper';
import { MongoService } from '../mongo/mongo.service';

@Module({
  controllers: [LoginController],
  providers: [LoginService, JwtHelper, MongoService],
  imports: [RegisterModule, LoginModule],
})
export class AuthModule {}
