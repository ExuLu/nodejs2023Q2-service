import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getAllUsers() {
    return {};
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
