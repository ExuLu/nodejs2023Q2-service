import { Injectable } from '@nestjs/common';
import { database } from 'src/db/database';
import { Favorites } from './favoritesType';

@Injectable()
export class FavoriteService {
  getAllFavorites(): Favorites {
    return database.favorites;
  }
}
