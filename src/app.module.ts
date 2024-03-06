import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './users/user.controller';
import { UsersService } from './users/user.service';
import { APP_PIPE } from '@nestjs/core';
import { TrackController } from './tracks/track.controller';
import { TrackService } from './tracks/track.service';
import { ArtistService } from './artists/artist.service';
import { ArtistController } from './artists/artist.controller';
import { AlbumController } from './albums/album.controller';
import { AlbumService } from './albums/album.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    UserController,
    TrackController,
    ArtistController,
    AlbumController,
  ],
  providers: [
    AppService,
    UsersService,
    TrackService,
    ArtistService,
    AlbumService,
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
