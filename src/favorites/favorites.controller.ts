import { Controller, Get } from '@nestjs/common';
import { FavoriteService } from './favorites.service';
import { Favorites } from './favoritesType';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoriteService) {}

  @Get()
  getAllFavorites(): Favorites {
    return this.favoritesService.getAllFavorites();
  }
}
