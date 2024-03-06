import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './users/user.controller';
import { UsersService } from './users/user.service';
import { APP_PIPE } from '@nestjs/core';
import { TrackController } from './tracks/track.controller';
import { TrackService } from './tracks/track.service';

@Module({
  imports: [],
  controllers: [AppController, UserController, TrackController],
  providers: [
    AppService,
    UsersService,
    TrackService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
  ],
})
export class AppModule {}
