import { Injectable, NotFoundException } from '@nestjs/common';
import { database } from 'src/db/database';
import { NotValidIdException } from 'src/errors/notValidId';
import { Album } from 'src/albums/albumType';
import { Artist } from 'src/artists/artistInterface';
import { Track } from 'src/tracks/trackInterface';
import { CreateTrackDto, UpdateTrackDto } from 'src/tracks/trackDtos';
import { validate, v4 as uuidv4 } from 'uuid';
import { newDb } from 'src/db/database.service';

@Injectable()
export class TrackService {
  constructor(private readonly db: newDb) {}

  getAllTracks(): Track[] {
    return this.db.getAllTracks();
  }

  getTrackById(id: string): Track {
    const idIsValid: boolean = validate(id);
    if (!idIsValid) throw new NotValidIdException();

    const track: Track | null = this.db.getTrack(id);
    if (!track) throw new NotFoundException();

    return track;
  }

  addNewTrack(dto: CreateTrackDto): Track {
    const { artistId, albumId } = dto;

    const idsAreValid: boolean =
      (validate(albumId) && validate(artistId)) ||
      albumId === null ||
      artistId === null;
    if (!idsAreValid) throw new NotValidIdException();

    const newTrack: Track = {
      id: uuidv4(),
      ...dto,
    };

    const artist: Artist | null = this.db.getArtist(artistId);
    if (!artist && artistId !== null) newTrack.artistId = null;

    const album: Album | null = database.albums.find(
      (alb) => alb.id === albumId,
    );
    if (!album && albumId !== null) newTrack.albumId = null;

    this.db.addTrack(newTrack);
    return newTrack;
  }

  changeTrack(id: string, dto: UpdateTrackDto): Track {
    const idIsValid: boolean = validate(id);
    if (!idIsValid) throw new NotValidIdException();

    const idsAreValid: boolean =
      (validate(dto.albumId) && validate(dto.artistId)) ||
      dto.albumId === null ||
      dto.artistId === null ||
      !dto.albumId ||
      !dto.artistId;
    if (!idsAreValid) throw new NotValidIdException();

    const updatedTrack: Track = { id, ...dto };
    const trackIndex: number = database.tracks.findIndex((tr) => tr.id === id);
    if (trackIndex < 0) throw new NotFoundException();

    const artist: Artist = database.artists.find(
      (art) => art.id === dto.artistId,
    );
    if (!artist && dto.artistId !== null) updatedTrack.artistId = null;

    const album: Album = database.albums.find((alb) => alb.id === dto.albumId);
    if (!album && dto.albumId !== null) updatedTrack.albumId = null;

    database.tracks.splice(trackIndex, 1);
    database.tracks.push(updatedTrack);
    return updatedTrack;
  }

  deleteTrack(id: string): void {
    const idIsValid: boolean = validate(id);
    if (!idIsValid) throw new NotValidIdException();

    const trackIndex: number = database.tracks.findIndex((tr) => tr.id === id);
    if (trackIndex < 0) throw new NotFoundException();

    const trackIndexFav = database.favorites.tracks.findIndex(
      (tr) => tr.id === id,
    );
    database.favorites.tracks.splice(trackIndexFav, 1);

    database.tracks.splice(trackIndex, 1);
  }
}
