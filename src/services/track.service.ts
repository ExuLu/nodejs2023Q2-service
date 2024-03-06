import { Injectable, NotFoundException } from '@nestjs/common';
import { database } from 'src/db/database';
import { NotValidIdException } from 'src/errors/notValidId';
import { CreateTrackDto, UpdateTrackDto } from 'src/validators/trackValidators';
import { validate } from 'uuid';

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
    return database.tracks;
  }

  changeTrack(id: string, dto: UpdateTrackDto) {
    return database.tracks;
  }

  deleteTrack(id: string) {
    return database.tracks;
  }
}
