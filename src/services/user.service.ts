import { Injectable, NotFoundException } from '@nestjs/common';
import { database } from 'src/db/database';
import { NotValidIdException } from 'src/errors/notValidId';
import { WrongPasswordException } from 'src/errors/wrongPassword';
import { User } from 'src/types/user';
import { CreateUserDto, UpdateUserDto } from 'src/validators/userValidators';
import { validate, v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  getAllUsers() {
    return database.users;
  }

  getUserById(id: string) {
    const idIsValid = validate(id);
    if (!idIsValid) throw new NotValidIdException();

    const user = database.users.find((us) => us.id === id);
    if (!user) throw new NotFoundException();

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

  updateUserPassword(id: string, dto: UpdateUserDto) {
    const idIsValid = validate(id);
    if (!idIsValid) throw new NotValidIdException();

    const user = database.users.find((us) => us.id === id);
    if (!user) throw new NotFoundException();

    const { oldPassword, newPassword } = dto;
    if (user.password !== oldPassword) throw new WrongPasswordException();

    user.password = newPassword;
    user.updatedAt = Date.now();
    user.version++;
    return user;
  }

  deleteUser(id: string) {
    const idIsValid = validate(id);
    if (!idIsValid) throw new NotValidIdException();

    const userIndex = database.users.findIndex((us) => us.id === id);
    if (userIndex < 0) throw new NotFoundException();

    database.users.splice(userIndex, 1);
  }
}
