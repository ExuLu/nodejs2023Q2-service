import { Injectable } from '@nestjs/common';
import { CreateTrackDto, UpdateTrackDto } from 'src/validators/trackValidators';

@Injectable()
export class TrackService {
  getAllTracks() {}

  getTrackById(id: string) {}

  addNewTrack(dto: CreateTrackDto) {}

  changeTrack(id: string, dto: UpdateTrackDto) {}

  deleteTrack(id: string) {}
}
