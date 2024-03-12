import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UsersService } from './user.service';
import { DatabaseModule } from 'src/db/database.module';

@Module({
  controllers: [UserController],
  providers: [UsersService],
  imports: [DatabaseModule],
})
export class UserModule {}
