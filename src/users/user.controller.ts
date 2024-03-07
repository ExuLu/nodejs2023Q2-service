import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from 'src/users/user.service';
import { User, safeUser } from 'src/users/userTypes';
import { CreateUserDto, UpdateUserDto } from 'src/users/userDtos';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getAllUsers(): safeUser[] {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string): safeUser {
    return this.userService.getUserById(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): User {
    return this.userService.createNewUser(createUserDto);
  }

  @Put(':id')
  updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdateUserDto,
  ): User {
    return this.userService.updateUserPassword(id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id') id: string): void {
    return this.userService.deleteUser(id);
  }
}
