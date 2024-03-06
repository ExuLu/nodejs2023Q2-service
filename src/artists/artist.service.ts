import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from './artistInterface';
import { database } from 'src/db/database';
import { CreateArtistDto, UpdateArtistDto } from './artistDtos';
import { validate } from 'uuid';
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
    const newArtist = { ...dto, id: '1', name: 'Pink', grammy: false };
    return newArtist;
  }

  updateArtistInfo(id: string, dto: UpdateArtistDto): Artist {
    const artist: Artist = database.artists.find((art) => art.id === id);
    const newArtist = { ...artist, ...dto };
    return newArtist;
  }

  deleteArtist(id: string): void {
    const artistIndex = database.artists.findIndex((art) => art.id === id);
    database.artists.splice(artistIndex, 1);
  }
}
