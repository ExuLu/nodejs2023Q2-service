import { Db } from 'src/types/database';
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
  tracks: [],
  albums: [],
  favorites: {
    artists: [],
    tracks: [],
    albums: [],
  },
};
