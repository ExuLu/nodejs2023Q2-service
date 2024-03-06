import { Injectable, NotFoundException } from '@nestjs/common';
import { database } from 'src/db/database';
import { NotValidIdException } from 'src/errors/notValidId';
import { Track } from 'src/types/track';
import { CreateTrackDto, UpdateTrackDto } from 'src/validators/trackValidators';
import { validate, v4 as uuidv4 } from 'uuid';

@Injectable()
export class TrackService {
  getAllTracks() {
    return database.tracks;
  }

  getTrackById(id: string) {
    const idIsValid = validate(id);
    if (!idIsValid) throw new NotValidIdException();

    const track = database.tracks.find((tr) => tr.id === id);
    if (!track) throw new NotFoundException();

    return track;
  }

  addNewTrack(dto: CreateTrackDto) {
    const idsAreValid =
      (validate(dto.albumId) && validate(dto.artistId)) ||
      dto.albumId === null ||
      dto.artistId === null;
    if (!idsAreValid) throw new NotValidIdException();

    const newTrack: Track = {
      id: uuidv4(),
      ...dto,
    };

    const artist = database.artists.find((art) => art.id === dto.artistId);
    if (!artist && dto.artistId !== null) newTrack.artistId = null;

    const album = database.albums.find((alb) => alb.id === dto.albumId);
    if (!album && dto.albumId !== null) newTrack.albumId = null;

    database.tracks.push(newTrack);
    return newTrack;
  }

  changeTrack(id: string, dto: UpdateTrackDto) {
    

    return database.tracks;
  }

  deleteTrack(id: string) {
    return database.tracks;
  }
}
