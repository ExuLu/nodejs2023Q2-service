import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { FavoriteService } from './favorites.service';
import { Favorites } from './favoritesType';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoriteService) {}

  @Get()
  getAllFavorites(): Favorites {
    return this.favoritesService.getAllFavorites();
  }

  @Post('track/:id')
  addTrack(@Param('id') id: string): object {
    return this.favoritesService.addTrackToFavs(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  deleteTrack(@Param('id') id: string): void {
    return this.favoritesService.deleteTrackFromFavs(id);
  }
}
