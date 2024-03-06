import { Injectable } from '@nestjs/common';
import { Album } from './albumType';
import { database } from 'src/db/database';

@Injectable()
export class AlbumService {
  getAllAlbums(): Album[] {
    return database.albums;
  }

  getAlbumById(id: string): Album {
    const album: Album = database.albums.find((alb) => alb.id === id);
    return album;
  }
}
