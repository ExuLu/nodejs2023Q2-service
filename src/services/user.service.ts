import { Injectable } from '@nestjs/common';
import { database } from 'src/db/database';
import { validate } from 'uuid';

@Injectable()
export class UsersService {
  getAllUsers() {
    return database.users;
  }

  getUserById(id: string) {
    const idIsValid = validate(id);
    const users = database.users;
    if (idIsValid) {
      const user = users.find((us) => us.id === id);
      return user;
    }
  }
}
