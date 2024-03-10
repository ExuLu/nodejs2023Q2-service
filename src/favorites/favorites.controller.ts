import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { FavoriteService } from './favorites.service';
import { FavoritesResponse } from './favoritesTypes';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoriteService) {}

  @Get()
  getAllFavorites(): FavoritesResponse {
    return this.favoritesService.getAllFavoritesResponse();
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

  @Post('album/:id')
  addAlbum(@Param('id') id: string): object {
    return this.favoritesService.addAlbumToFavs(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  deleteAlbum(@Param('id') id: string): void {
    return this.favoritesService.deleteAlbumFromFavs(id);
  }

  @Post('artist/:id')
  addArtist(@Param('id') id: string): object {
    return this.favoritesService.addArtistToFavs(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  deleteArtist(@Param('id') id: string): void {
    return this.favoritesService.deleteArtistFromFavs(id);
  }
}
