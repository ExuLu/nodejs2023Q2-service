import { Injectable, NotFoundException } from '@nestjs/common';
import { database } from 'src/db/database';
import { NotValidIdException } from 'src/errors/notValidId';
import { User } from 'src/types/user';
import { CreateUserDto } from 'src/validators/userValidators';
import { validate, v4 as uuidv4 } from 'uuid';

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

  createNewUser(dto: CreateUserDto) {
    const newUser: User = {
      ...dto,
      id: uuidv4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    database.users.push(newUser);
    return newUser;
  }
}
