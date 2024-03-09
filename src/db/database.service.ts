import { Injectable } from '@nestjs/common';
import { Album } from '../albums/albumType';
import { Artist } from '../artists/artistInterface';
import { Favorites } from '../favorites/favoritesType';
import { Track } from '../tracks/trackInterface';
import { User } from '../users/userTypes';

export interface Db {
  users: User[];
  artists: Artist[];
  tracks: Track[];
  albums: Album[];
  favorites: Favorites;
}

@Injectable()
export class newDb {
  private readonly users: User[] = [];
  private readonly artists: Artist[] = [];
  private readonly tracks: Track[] = [];
  private readonly albums: Album[] = [];
  private readonly favorites: Favorites = {
    tracks: [],
    albums: [],
    artists: [],
  };

  getAllUsers(): User[] {
    return this.users;
  }

  getUser(id: string): User {
    const user = this.users.find((us) => us.id === id);
    return user || null;
  }

  addUser(user: User): void {
    this.users.push(user);
  }

  changeUser(id: string, newPassword: string): void {
    const user = this.getUser(id);
    user.password = newPassword;
    user.updatedAt = Date.now();
    user.version++;
  }

  deleteUser(id: string): void {
    const userIndex = this.users.findIndex((us) => us.id === id);
    this.users.splice(userIndex, 1);
  }

  getAllTracks(): Track[] {
    return this.tracks;
  }

  getTrack(id: string): Track {
    const track = this.tracks.find((tr) => tr.id === id);
    return track || null;
  }
}
