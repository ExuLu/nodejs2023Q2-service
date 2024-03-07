import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_PIPE } from '@nestjs/core';
import { UserModule } from './users/user.module';
import { TrackModule } from './tracks/track.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ArtistModule } from './artists/artist.module';
import { AlbumModule } from './albums/album.module';

@Module({
  imports: [
    UserModule,
    TrackModule,
    FavoritesModule,
    ArtistModule,
    AlbumModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
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
