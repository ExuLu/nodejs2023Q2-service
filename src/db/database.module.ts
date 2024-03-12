import { Module } from '@nestjs/common';
import { newDb } from './database.service';

@Module({
  providers: [newDb],
  exports: [newDb],
})
export class DatabaseModule {}
