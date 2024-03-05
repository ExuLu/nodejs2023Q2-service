import { Db } from 'src/types/database';

export const database: Db = {
  users: [],
  artists: [],
  tracks: [],
  albums: [],
  favorites: {
    artists: [],
    tracks: [],
    albums: [],
  },
};
