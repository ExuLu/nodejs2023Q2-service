import { Album } from '../albums/albumType';
import { Artist } from '../artists/artistInterface';
import { Favorites } from '../favorites/favoritesType';
import { Track } from '../tracks/trackInterface';
import { User } from '../users/userInterface';

export interface Db {
  users: User[];
  artists: Artist[];
  tracks: Track[];
  albums: Album[];
  favorites: Favorites;
}
