import { Album } from 'src/albums/albumType';
import { Artist } from 'src/artists/artistInterface';
import { Track } from 'src/tracks/trackInterface';

export interface Favorites {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
