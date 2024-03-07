import { Injectable, NotFoundException } from '@nestjs/common';
import { database } from 'src/db/database';
import { NotValidIdException } from 'src/errors/notValidId';
import { WrongPasswordException } from 'src/errors/wrongPassword';
import { User, safeUser } from 'src/users/userTypes';
import { CreateUserDto, UpdateUserDto } from 'src/users/userDtos';
import { validate, v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  getAllUsers(): safeUser[] {
    const safeUsers = database.users.map((user) => {
      delete user.password;
      return user;
    });
    return safeUsers;
  }

  getUserById(id: string): safeUser {
    const idIsValid: boolean = validate(id);
    if (!idIsValid) throw new NotValidIdException();

    const user: User = database.users.find((us) => us.id === id);
    if (!user) throw new NotFoundException();

    const safeUser = { ...user };
    delete safeUser.password;
    return safeUser;
  }

  createNewUser(dto: CreateUserDto): User {
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

  updateUserPassword(id: string, dto: UpdateUserDto): User {
    const idIsValid: boolean = validate(id);
    if (!idIsValid) throw new NotValidIdException();

    const user: User = database.users.find((us) => us.id === id);
    if (!user) throw new NotFoundException();

    const { oldPassword, newPassword } = dto;
    if (user.password !== oldPassword) throw new WrongPasswordException();

    user.password = newPassword;
    user.updatedAt = Date.now();
    user.version++;
    return user;
  }

  deleteUser(id: string): void {
    const idIsValid = validate(id);
    if (!idIsValid) throw new NotValidIdException();

    const userIndex = database.users.findIndex((us) => us.id === id);
    if (userIndex < 0) throw new NotFoundException();

    database.users.splice(userIndex, 1);
  }
}
