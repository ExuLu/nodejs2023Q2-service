import { Db } from 'src/db/databaseType';
import { v4 as uuidv4 } from 'uuid';

export const database: Db = {
  users: [
    {
      id: uuidv4(),
      login: 'exulu',
      password: 'password',
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  ],
  artists: [],
  tracks: [
    {
      id: uuidv4(),
      name: 'So what',
      artistId: '1',
      albumId: null,
      duration: 210,
    },
  ],
  albums: [],
  favorites: {
    artists: [],
    tracks: [],
    albums: [],
  },
};
