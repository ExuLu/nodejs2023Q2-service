import { Injectable } from '@nestjs/common';
import { Album } from './albumType';
import { database } from 'src/db/database';
import { AlbumCreateDto } from './albumDtos';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlbumService {
  getAllAlbums(): Album[] {
    return database.albums;
  }

  getAlbumById(id: string): Album {
    const album: Album = database.albums.find((alb) => alb.id === id);
    return album;
  }

  createNewAlbum(dto: AlbumCreateDto): Album {
    const newAlbum: Album = { id: uuidv4(), ...dto };
    return newAlbum;
  }
}
