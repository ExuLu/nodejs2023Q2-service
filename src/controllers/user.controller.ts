import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from 'src/services/user.service';
import { CreateUserDto, UpdateUserDto } from 'src/validators/userValidators';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createNewUser(createUserDto);
  }

  @Put(':id')
  updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdateUserDto,
  ) {
    return this.userService.updateUserPassword(id, updatePasswordDto);
  }
}
