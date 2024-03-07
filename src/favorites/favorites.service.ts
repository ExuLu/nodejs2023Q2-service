import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { database } from 'src/db/database';
import { Favorites } from './favoritesType';
import { validate } from 'uuid';
import { NotValidIdException } from 'src/errors/notValidId';

@Injectable()
export class FavoriteService {
  getAllFavorites(): Favorites {
    return database.favorites;
  }

  addTrackToFavs(id: string): object {
    const idIsValid = validate(id);
    if (!idIsValid) throw new NotValidIdException();

    const track = database.tracks.find((tr) => tr.id === id);
    if (!track) throw new UnprocessableEntityException('Track is not found');

    const trackIsInFavs = database.favorites.tracks.find((tr) => tr.id === id);
    if (trackIsInFavs)
      throw new UnprocessableEntityException('Track is already in favorites');

    database.favorites.tracks.push(track);
    return { message: 'Track was successfully added to favorites' };
  }

  deleteTrackFromFavs(id: string): void {
    const idIsValid = validate(id);
    if (!idIsValid) throw new NotValidIdException();

    const trackIndex: number = database.favorites.tracks.findIndex(
      (tr) => tr.id === id,
    );
    database.favorites.tracks.splice(trackIndex, 1);
  }
}
