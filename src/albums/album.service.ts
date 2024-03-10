import { Injectable, NotFoundException } from '@nestjs/common';
import { Album } from './albumType';
import { database } from 'src/db/database';
import { CreateAlbumDto, UpdateAlbumDto } from './albumDtos';
import { v4 as uuidv4, validate } from 'uuid';
import { NotValidIdException } from 'src/errors/notValidId';
import { newDb } from 'src/db/database.service';
import { Artist } from 'src/artists/artistInterface';

@Injectable()
export class AlbumService {
  constructor(private readonly db: newDb) {}

  getAllAlbums(): Album[] {
    return this.db.getAllAlbums();
  }

  getAlbumById(id: string): Album {
    const idIsValid = validate(id);
    if (!idIsValid) throw new NotValidIdException();

    const album: Album = this.db.getAlbum(id);
    if (!album) throw new NotFoundException();

    return album;
  }

  createNewAlbum(dto: CreateAlbumDto): Album {
    const { artistId } = dto;
    const idIsValid = artistId === null || validate(artistId);
    if (!idIsValid) throw new NotValidIdException();

    const newAlbum: Album = { id: uuidv4(), ...dto };

    const artist: Artist = this.db.getArtist(artistId);
    if (!artist) newAlbum.artistId = null;

    this.db.addAlbum(newAlbum);

    return newAlbum;
  }

  updateAlbumInfo(id: string, dto: UpdateAlbumDto): Album {
    const { artistId } = dto;
    const idIsValid = validate(id);
    if (!idIsValid) throw new NotValidIdException();

    const artistIdIsValid = artistId === null || validate(artistId);
    if (!artistIdIsValid) throw new NotValidIdException();

    const album: Album = this.db.getAlbum(id);
    if (!album) throw new NotFoundException();

    const updatedAlbum = { id, ...dto };
    const artist = this.db.getArtist(artistId);
    if (!artist) updatedAlbum.artistId = null;

    this.db.changeAlbum(id, updatedAlbum);

    return updatedAlbum;
  }

  deleteAlbum(id: string): void {
    const idIsValid = validate(id);
    if (!idIsValid) throw new NotValidIdException();

    const album: Album = this.db.getAlbum(id);
    if (!album) throw new NotFoundException();

    database.tracks.forEach((tr) => {
      if (tr.albumId === id) tr.albumId = null;
    });
    database.favorites.tracks.forEach((tr) => {
      if (tr.albumId === id) tr.albumId = null;
    });

    const albIndexFav = database.favorites.albums.findIndex(
      (alb) => alb.id === id,
    );
    database.favorites.albums.splice(albIndexFav, 1);

    database.albums.splice(albumIndex, 1);
  }
}
