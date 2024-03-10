import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from './artistInterface';
import { database } from 'src/db/database';
import { CreateArtistDto, UpdateArtistDto } from './artistDtos';
import { validate, v4 as uuidv4 } from 'uuid';
import { NotValidIdException } from 'src/errors/notValidId';
import { newDb } from 'src/db/database.service';

@Injectable()
export class ArtistService {
  constructor(private readonly db: newDb) {}

  getAllArtists(): Artist[] {
    return this.db.getAllArtists();
  }

  getArtistById(id: string): Artist {
    const idIsValid: boolean = validate(id);
    if (!idIsValid) throw new NotValidIdException();

    const artist: Artist = this.db.getArtist(id);
    if (!artist) throw new NotFoundException();

    return artist;
  }

  createNewArtist(dto: CreateArtistDto): Artist {
    const newArtist: Artist = { ...dto, id: uuidv4() };
    this.db.addArtist(newArtist);
    return newArtist;
  }

  updateArtistInfo(id: string, dto: UpdateArtistDto): Artist {
    const idIsValid: boolean = validate(id);
    if (!idIsValid) throw new NotValidIdException();

    const artist: Artist = this.db.getArtist(id);
    if (!artist) throw new NotFoundException();

    const newArtist = { id, ...dto };
    this.db.changeArtist(id, newArtist);
    return newArtist;
  }

  deleteArtist(id: string): void {
    const idIsValid: boolean = validate(id);
    if (!idIsValid) throw new NotValidIdException();

    const artist: Artist = this.db.getArtist(id);
    if (!artist) throw new NotFoundException();

    this.db.deleteArtistFromTrack(id);

    this.db.deleteArtistFromAlbum(id);

    // const artistIndexFav = database.favorites.artists.findIndex(
    //   (art) => art.id === id,
    // );
    // database.favorites.artists.splice(artistIndexFav, 1);

    this.db.deleteArtist(id);
  }
}
