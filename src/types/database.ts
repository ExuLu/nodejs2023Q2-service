import { Album } from './album';
import { Artist } from './artist';
import { Favorites } from './favorites';
import { Track } from '../tracks/trackInterface';
import { User } from '../users/userInterface';

export interface Db {
  users: User[];
  artists: Artist[];
  tracks: Track[];
  albums: Album[];
  favorites: Favorites;
}
