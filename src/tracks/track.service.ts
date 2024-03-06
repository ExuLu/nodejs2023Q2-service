import { Injectable, NotFoundException } from '@nestjs/common';
import { database } from 'src/db/database';
import { NotValidIdException } from 'src/errors/notValidId';
import { Album } from 'src/types/album';
import { Artist } from 'src/types/artist';
import { Track } from 'src/tracks/trackInterface';
import { CreateTrackDto, UpdateTrackDto } from 'src/tracks/trackDtos';
import { validate, v4 as uuidv4 } from 'uuid';

@Injectable()
export class TrackService {
  getAllTracks(): Track[] {
    return database.tracks;
  }

  getTrackById(id: string): Track {
    const idIsValid: boolean = validate(id);
    if (!idIsValid) throw new NotValidIdException();

    const track: Track = database.tracks.find((tr) => tr.id === id);
    if (!track) throw new NotFoundException();

    return track;
  }

  addNewTrack(dto: CreateTrackDto): Track {
    const idsAreValid: boolean =
      (validate(dto.albumId) && validate(dto.artistId)) ||
      dto.albumId === null ||
      dto.artistId === null;
    if (!idsAreValid) throw new NotValidIdException();

    const newTrack: Track = {
      id: uuidv4(),
      ...dto,
    };

    const artist: Artist = database.artists.find(
      (art) => art.id === dto.artistId,
    );
    if (!artist && dto.artistId !== null) newTrack.artistId = null;

    const album: Album = database.albums.find((alb) => alb.id === dto.albumId);
    if (!album && dto.albumId !== null) newTrack.albumId = null;

    database.tracks.push(newTrack);
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
    let track: Track = database.tracks.find((tr) => tr.id === id);

    const artist: Artist = database.artists.find(
      (art) => art.id === dto.artistId,
    );
    if (!artist && dto.artistId !== null) updatedTrack.artistId = null;

    const album: Album = database.albums.find((alb) => alb.id === dto.albumId);
    if (!album && dto.albumId !== null) updatedTrack.albumId = null;

    track = { ...track, ...updatedTrack };
    return track;
  }

  deleteTrack(id: string): void {
    const idIsValid: boolean = validate(id);
    if (!idIsValid) throw new NotValidIdException();

    const trackIndex: number = database.tracks.findIndex((tr) => tr.id === id);
    if (trackIndex < 0) throw new NotFoundException();

    database.tracks.splice(trackIndex, 1);
  }
}
