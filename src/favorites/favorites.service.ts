import { Injectable } from '@nestjs/common';
import { database } from 'src/db/database';
import { Favorites } from './favoritesType';

@Injectable()
export class FavoriteService {
  getAllFavorites(): Favorites {
    return database.favorites;
  }

  addTrackToFavs(id: string) {
    const track = database.tracks.find((tr) => tr.id === id);
    database.favorites.tracks.push(track);
    return track;
  }
}
