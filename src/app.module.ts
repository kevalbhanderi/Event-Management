import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './modules/auth/auth.module';
import { ProfileModule } from './modules/profile/profile.module';
import { EventModule } from './modules/event/event.module';

@Module({
  imports: [
    AuthModule,
    MulterModule.register({
      dest: './public/uploads',
    }),
    ProfileModule,
    EventModule,
  ],
  controllers: [],
})
export class AppModule {}
