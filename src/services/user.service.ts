import { Injectable, NotFoundException } from '@nestjs/common';
import { database } from 'src/db/database';
import { NotValidIdException } from 'src/errors/notValidId';
import { validate } from 'uuid';

@Injectable()
export class UsersService {
  getAllUsers() {
    return database.users;
  }

  getUserById(id: string) {
    const idIsValid = validate(id);
    if (!idIsValid) {
      throw new NotValidIdException();
    }
    const users = database.users;
    const user = users.find((us) => us.id === id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
