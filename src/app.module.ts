import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './controllers/user.controller';
import { UsersService } from './services/user.service';
import { APP_PIPE } from '@nestjs/core';
import { TrackController } from './controllers/track.controller';
import { TrackService } from './services/track.service';

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
