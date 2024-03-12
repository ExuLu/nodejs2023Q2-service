import { Injectable, NotFoundException } from '@nestjs/common';
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
    // const { artistId, albumId } = dto;

    // const idsAreValid: boolean =
    //   (validate(albumId) && validate(artistId)) ||
    //   albumId === null ||
    //   artistId === null;
    // if (!idsAreValid) throw new NotValidIdException();

    const newTrack: Track = {
      id: uuidv4(),
      ...dto,
    };

    // const artist: Artist | null = this.db.getArtist(artistId);
    // if (!artist && artistId !== null) newTrack.artistId = null;

    // const album: Album | null = database.albums.find(
    //   (alb) => alb.id === albumId,
    // );
    // if (!album && albumId !== null) newTrack.albumId = null;

    this.db.addTrack(newTrack);
    return newTrack;
  }

  changeTrack(id: string, dto: UpdateTrackDto): Track {
    const idIsValid: boolean = validate(id);
    if (!idIsValid) throw new NotValidIdException();

    const { albumId, artistId } = dto;

    const idsAreValid: boolean =
      (validate(albumId) && validate(artistId)) ||
      albumId === null ||
      artistId === null ||
      !albumId ||
      !artistId;
    if (!idsAreValid) throw new NotValidIdException();

    const updatedTrack: Track = { id, ...dto };
    let track: Track = this.db.getTrack(id);
    if (!track) throw new NotFoundException();

    const artist: Artist = this.db.getArtist(artistId);
    if (!artist && artistId !== null) updatedTrack.artistId = null;

    const album: Album = this.db.getAlbum(albumId);
    if (!album && albumId !== null) updatedTrack.albumId = null;

    this.db.changeTrack(id, updatedTrack);
    track = this.db.getTrack(id);
    return track;
  }

  deleteTrack(id: string): void {
    const idIsValid: boolean = validate(id);
    if (!idIsValid) throw new NotValidIdException();

    const track: Track = this.db.getTrack(id);
    if (!track) throw new NotFoundException();

    this.db.deleteTrackFromFavs(id);

    this.db.deleteTrack(id);
  }
}
