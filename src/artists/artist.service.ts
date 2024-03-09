import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from './artistInterface';
import { database } from 'src/db/database';
import { CreateArtistDto, UpdateArtistDto } from './artistDtos';
import { validate, v4 as uuidv4 } from 'uuid';
import { NotValidIdException } from 'src/errors/notValidId';

@Injectable()
export class ArtistService {
  getAllArtists(): Artist[] {
    return database.artists;
  }

  getArtistById(id: string): Artist {
    const idIsValid: boolean = validate(id);
    if (!idIsValid) throw new NotValidIdException();

    const artist: Artist = database.artists.find((art) => art.id === id);
    if (!artist) throw new NotFoundException();

    return artist;
  }

  createNewArtist(dto: CreateArtistDto): Artist {
    const newArtist: Artist = { ...dto, id: uuidv4() };
    database.artists.push(newArtist);
    return newArtist;
  }

  updateArtistInfo(id: string, dto: UpdateArtistDto): Artist {
    const idIsValid: boolean = validate(id);
    if (!idIsValid) throw new NotValidIdException();

    const artistIndex: number = database.artists.findIndex(
      (art) => art.id === id,
    );
    if (artistIndex < 0) throw new NotFoundException();

    const newArtist = { id, ...dto };
    database.artists.splice(artistIndex, 1);
    database.artists.push(newArtist);
    return newArtist;
  }

  deleteArtist(id: string): void {
    const idIsValid: boolean = validate(id);
    if (!idIsValid) throw new NotValidIdException();

    const artist: Artist = database.artists.find((art) => art.id === id);
    if (!artist) throw new NotFoundException();

    database.tracks.forEach((tr) => {
      if (tr.artistId === id) tr.artistId = null;
    });

    database.albums.forEach((alb) => {
      if (alb.artistId === id) alb.artistId = null;
    });

    const artistIndex = database.artists.findIndex((art) => art.id === id);
    database.artists.splice(artistIndex, 1);
  }
}
