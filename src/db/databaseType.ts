import { Album } from '../types/album';
import { Artist } from '../types/artist';
import { Favorites } from '../types/favorites';
import { Track } from '../tracks/trackInterface';
import { User } from '../users/userInterface';

export interface Db {
  users: User[];
  artists: Artist[];
  tracks: Track[];
  albums: Album[];
  favorites: Favorites;
}
