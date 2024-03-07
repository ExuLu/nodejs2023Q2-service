import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_PIPE } from '@nestjs/core';
import { ArtistService } from './artists/artist.service';
import { ArtistController } from './artists/artist.controller';
import { AlbumController } from './albums/album.controller';
import { AlbumService } from './albums/album.service';
import { UserModule } from './users/user.module';
import { TrackModule } from './tracks/track.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ArtistModule } from './artists/artist.module';

@Module({
  imports: [UserModule, TrackModule, FavoritesModule, ArtistModule],
  controllers: [AppController, AlbumController],
  providers: [
    AppService,
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
