import { Injectable } from '@nestjs/common';
import { database } from 'src/db/database';
import { CreateTrackDto, UpdateTrackDto } from 'src/validators/trackValidators';

@Injectable()
export class TrackService {
  getAllTracks() {
    return database.tracks;
  }

  getTrackById(id: string) {
    return database.tracks;
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
