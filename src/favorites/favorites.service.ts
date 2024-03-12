import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Favorites, FavoritesResponse } from './favoritesTypes';
import { validate } from 'uuid';
import { NotValidIdException } from 'src/errors/notValidId';
import { newDb } from 'src/db/database.service';

@Injectable()
export class FavoriteService {
  constructor(private readonly db: newDb) {}

  getAllFavorites(): Favorites {
    return this.db.getAllFavorites();
  }

  getAllFavoritesResponse(): FavoritesResponse {
    const { tracks, artists, albums } = this.getAllFavorites();

    const tracksInFavs = tracks.map((id) => this.db.getTrack(id));
    const artistsInFavs = artists.map((id) => this.db.getArtist(id));
    const albumsInFavs = albums.map((id) => this.db.getAlbum(id));

    const response: FavoritesResponse = {
      tracks: tracksInFavs,
      artists: artistsInFavs,
      albums: albumsInFavs,
    };

    return response;
  }

  addTrackToFavs(id: string): object {
    const idIsValid = validate(id);
    if (!idIsValid) throw new NotValidIdException();

    const track = this.db.getTrack(id);
    if (!track) throw new UnprocessableEntityException('Track is not found');

    const trackIsInFavs: boolean = this.db.getTrackFromFavs(id);
    if (trackIsInFavs)
      throw new UnprocessableEntityException('Track is already in favorites');

    this.db.addTrackToFavs(id);
    return { message: 'Track was successfully added to favorites' };
  }

  deleteTrackFromFavs(id: string): void {
    const idIsValid = validate(id);
    if (!idIsValid) throw new NotValidIdException();

    const trackInFavs: boolean = this.db.getTrackFromFavs(id);
    if (!trackInFavs)
      throw new NotFoundException('Track is not found in favorites');
    this.db.deleteTrackFromFavs(id);
  }

  addAlbumToFavs(id: string): object {
    const idIsValid = validate(id);
    if (!idIsValid) throw new NotValidIdException();

    const album = this.db.getAlbum(id);
    if (!album) throw new UnprocessableEntityException('Album is not found');

    const albumIsInFavs = this.db.getAlbumFromFavs(id);
    if (albumIsInFavs)
      throw new UnprocessableEntityException('Album is already in favorites');

    this.db.addAlbumToFavs(id);
    return { message: 'Album was successfully added to favorites' };
  }

  deleteAlbumFromFavs(id: string): void {
    const idIsValid = validate(id);
    if (!idIsValid) throw new NotValidIdException();

    const album: boolean = this.db.getAlbumFromFavs(id);
    if (!album) throw new NotFoundException('Album is not found in favorites');
    this.db.deleteAlbumFromFavs(id);
  }

  addArtistToFavs(id: string): object {
    const idIsValid = validate(id);
    if (!idIsValid) throw new NotValidIdException();

    const artist = this.db.getArtist(id);
    if (!artist) throw new UnprocessableEntityException('Artist is not found');

    const artistIsInFavs = this.db.getArtistFromFavs(id);
    if (artistIsInFavs)
      throw new UnprocessableEntityException('Artist is already in favorites');

    this.db.addArtistToFavs(id);
    return { message: 'Artist was successfully added to favorites' };
  }

  deleteArtistFromFavs(id: string): void {
    const idIsValid = validate(id);
    if (!idIsValid) throw new NotValidIdException();

    const artist: boolean = this.db.getArtistFromFavs(id);
    if (!artist)
      throw new NotFoundException('Artist is not found in favorites');
    this.db.deleteArtistFromFavs(id);
  }
}
