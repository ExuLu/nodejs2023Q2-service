import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { database } from 'src/db/database';
import { Favorites } from './favoritesType';
import { validate } from 'uuid';
import { NotValidIdException } from 'src/errors/notValidId';
import { newDb } from 'src/db/database.service';

@Injectable()
export class FavoriteService {
  constructor(private readonly db: newDb) {}

  getAllFavorites(): Favorites {
    return this.db.getAllFavorites();
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
    if (trackIndex < 0)
      throw new NotFoundException('Track is not found in favorites');
    database.favorites.tracks.splice(trackIndex, 1);
  }

  addAlbumToFavs(id: string): object {
    const idIsValid = validate(id);
    if (!idIsValid) throw new NotValidIdException();

    const album = database.albums.find((alb) => alb.id === id);
    if (!album) throw new UnprocessableEntityException('Album is not found');

    const albumIsInFavs = database.favorites.albums.find((tr) => tr.id === id);
    if (albumIsInFavs)
      throw new UnprocessableEntityException('Album is already in favorites');

    database.favorites.albums.push(album);
    return { message: 'Album was successfully added to favorites' };
  }

  deleteAlbumFromFavs(id: string): void {
    const idIsValid = validate(id);
    if (!idIsValid) throw new NotValidIdException();

    const albumIndex: number = database.favorites.albums.findIndex(
      (tr) => tr.id === id,
    );
    if (albumIndex < 0)
      throw new NotFoundException('Album is not found in favorites');
    database.favorites.albums.splice(albumIndex, 1);
  }

  addArtistToFavs(id: string): object {
    const idIsValid = validate(id);
    if (!idIsValid) throw new NotValidIdException();

    const artist = database.artists.find((alb) => alb.id === id);
    if (!artist) throw new UnprocessableEntityException('Artist is not found');

    const artistIsInFavs = database.favorites.artists.find(
      (tr) => tr.id === id,
    );
    if (artistIsInFavs)
      throw new UnprocessableEntityException('Artist is already in favorites');

    database.favorites.artists.push(artist);
    return { message: 'Artist was successfully added to favorites' };
  }

  deleteArtistFromFavs(id: string): void {
    const idIsValid = validate(id);
    if (!idIsValid) throw new NotValidIdException();

    const artistIndex: number = database.favorites.artists.findIndex(
      (tr) => tr.id === id,
    );
    if (artistIndex < 0)
      throw new NotFoundException('Artist is not found in favorites');
    database.favorites.artists.splice(artistIndex, 1);
  }
}
