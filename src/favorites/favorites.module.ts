import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoriteService } from './favorites.service';

@Module({ controllers: [FavoritesController], providers: [FavoriteService] })
export class FavoritesModule {}
