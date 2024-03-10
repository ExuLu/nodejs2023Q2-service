import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Favorites } from './favoritesType';
import { validate } from 'uuid';
import { NotValidIdException } from 'src/errors/notValidId';
import { newDb } from 'src/db/database.service';
import { Track } from 'src/tracks/trackInterface';
import { Artist } from 'src/artists/artistInterface';
import { Album } from 'src/albums/albumType';

@Injectable()
export class FavoriteService {
  constructor(private readonly db: newDb) {}

  getAllFavorites(): Favorites {
    return this.db.getAllFavorites();
  }

  addTrackToFavs(id: string): object {
    const idIsValid = validate(id);
    if (!idIsValid) throw new NotValidIdException();

    const track = this.db.getTrack(id);
    if (!track) throw new UnprocessableEntityException('Track is not found');

    const trackIsInFavs: Track | null = this.db.getTrackFromFavs(id);
    if (trackIsInFavs)
      throw new UnprocessableEntityException('Track is already in favorites');

    this.db.addTrackToFavs(id);
    return { message: 'Track was successfully added to favorites' };
  }

  deleteTrackFromFavs(id: string): void {
    const idIsValid = validate(id);
    if (!idIsValid) throw new NotValidIdException();

    const track: Track = this.db.getTrackFromFavs(id);
    if (!track) throw new NotFoundException('Track is not found in favorites');
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

    const album: Album = this.db.getAlbumFromFavs(id);
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

    const artist: Artist = this.db.getArtistFromFavs(id);
    if (!artist)
      throw new NotFoundException('Artist is not found in favorites');
    this.db.deleteArtistFromFavs(id);
  }
}
