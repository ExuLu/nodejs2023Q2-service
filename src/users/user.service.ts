import { Injectable, NotFoundException } from '@nestjs/common';
import { database } from 'src/db/database';
import { NotValidIdException } from 'src/errors/notValidId';
import { WrongPasswordException } from 'src/errors/wrongPassword';
import { User, SafeUser } from 'src/users/userTypes';
import { CreateUserDto, UpdateUserDto } from 'src/users/userDtos';
import { validate, v4 as uuidv4 } from 'uuid';
import { newDb } from 'src/db/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly db: newDb) {}

  getAllUsers(): SafeUser[] {
    const users = this.db.getAllUsers();
    console.log(users);
    const safeUsers = users.map((user) => {
      delete user.password;
      return user;
    });
    return safeUsers;
  }

  getUserById(id: string): SafeUser {
    const idIsValid: boolean = validate(id);
    if (!idIsValid) throw new NotValidIdException();

    const user: User = this.db.getUser(id);
    if (!user) throw new NotFoundException();

    const safeUser = { ...user };
    delete safeUser.password;
    return safeUser;
  }

  createNewUser(dto: CreateUserDto): SafeUser {
    const newUser: User = {
      ...dto,
      id: uuidv4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.db.addUser(newUser);
    const safeUser = { ...newUser };
    delete safeUser.password;
    return safeUser;
  }

  updateUserPassword(id: string, dto: UpdateUserDto): SafeUser {
    const idIsValid: boolean = validate(id);
    if (!idIsValid) throw new NotValidIdException();

    let user: User = this.db.getUser(id);
    if (!user) throw new NotFoundException();

    const { oldPassword, newPassword } = dto;
    if (user.password !== oldPassword) throw new WrongPasswordException();

    this.db.changeUser(id, newPassword);
    user = this.db.getUser(id);

    const safeUser = { ...user };
    delete safeUser.password;
    return safeUser;
  }

  deleteUser(id: string): void {
    const idIsValid = validate(id);
    if (!idIsValid) throw new NotValidIdException();

    const user = this.db.getUser(id);
    if (!user) throw new NotFoundException();

    this.db.deleteUser(id);
  }
}
