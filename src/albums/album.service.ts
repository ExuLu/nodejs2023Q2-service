import { Injectable, NotFoundException } from '@nestjs/common';
import { Album } from './albumType';
import { database } from 'src/db/database';
import { CreateAlbumDto, UpdateAlbumDto } from './albumDtos';
import { v4 as uuidv4, validate } from 'uuid';
import { NotValidIdException } from 'src/errors/notValidId';

@Injectable()
export class AlbumService {
  getAllAlbums(): Album[] {
    return database.albums;
  }

  getAlbumById(id: string): Album {
    const idIsValid = validate(id);
    if (!idIsValid) throw new NotValidIdException();

    const album: Album = database.albums.find((alb) => alb.id === id);
    if (!album) throw new NotFoundException();

    return album;
  }

  createNewAlbum(dto: CreateAlbumDto): Album {
    const idIsValid = dto.artistId === null || validate(dto.artistId);
    if (!idIsValid) throw new NotValidIdException();

    const newAlbum: Album = { id: uuidv4(), ...dto };

    const artist = database.artists.find((art) => art.id === dto.artistId);
    if (!artist) newAlbum.artistId = null;

    return newAlbum;
  }

  updateAlbumInfo(id: string, dto: UpdateAlbumDto): Album {
    const idIsValid = validate(id);
    if (!idIsValid) throw new NotValidIdException();

    const artistIdIsValid = dto.artistId === null || validate(dto.artistId);
    if (!artistIdIsValid) throw new NotValidIdException();

    const albumIndex: number = database.albums.findIndex(
      (alb) => alb.id === id,
    );
    if (albumIndex < 0) throw new NotFoundException();

    const updatedAlbum = { id, ...dto };
    return updatedAlbum;
  }

  deleteAlbum(id: string): void {
    const albumIndex: number = database.albums.findIndex(
      (alb) => alb.id === id,
    );
    database.albums.splice(albumIndex, 1);
  }
}
