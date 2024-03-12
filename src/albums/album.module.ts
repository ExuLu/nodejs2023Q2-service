import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { DatabaseModule } from 'src/db/database.module';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [DatabaseModule],
})
export class AlbumModule {}
