import { Injectable } from '@nestjs/common';
import { database } from 'src/db/database';

@Injectable()
export class UsersService {
  getAllUsers() {
    return database.users;
  }

  getUserById(id: string) {
    const users = [
      {
        id: '1',
        name: 'Alena',
      },
    ];
    const user = users.find((us) => us.id === id);
    return user;
  }
}
