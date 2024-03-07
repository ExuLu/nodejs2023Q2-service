import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_PIPE } from '@nestjs/core';
import { ArtistService } from './artists/artist.service';
import { ArtistController } from './artists/artist.controller';
import { AlbumController } from './albums/album.controller';
import { AlbumService } from './albums/album.service';
import { FavoritesController } from './favorites/favorites.controller';
import { FavoriteService } from './favorites/favorites.service';
import { UserModule } from './users/user.module';
import { TrackModule } from './tracks/track.module';

@Module({
  imports: [UserModule, TrackModule],
  controllers: [
    AppController,
    ArtistController,
    AlbumController,
    FavoritesController,
  ],
  providers: [
    AppService,
    ArtistService,
    AlbumService,
    FavoriteService,
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
