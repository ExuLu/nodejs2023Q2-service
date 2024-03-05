import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './controllers/user.controller';
import { UsersService } from './services/user.service';

@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [AppService, UsersService],
})
export class AppModule {}
