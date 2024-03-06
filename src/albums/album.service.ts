import { Injectable } from '@nestjs/common';
import { Album } from './albumType';
import { database } from 'src/db/database';
import { CreateAlbumDto, UpdateAlbumDto } from './albumDtos';
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

  createNewAlbum(dto: CreateAlbumDto): Album {
    const newAlbum: Album = { id: uuidv4(), ...dto };
    return newAlbum;
  }

  updateAlbomInfo(id: string, dto: UpdateAlbumDto): Album {
    const updatedAlbum = { id, ...dto };
    return updatedAlbum;
  }
}
