import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MulterModule.register({
      dest: './public/uploads',
    }),
  ],
  controllers: [],
})
export class AppModule {}
