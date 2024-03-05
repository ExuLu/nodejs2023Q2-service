import { Album } from './album';
import { Artist } from './artist';
import { Favorites } from './favorites';
import { Track } from './track';
import { User } from './user';

export interface Db {
  users: User[];
  artists: Artist[];
  tracks: Track[];
  albums: Album[];
  favorites: Favorites;
}
