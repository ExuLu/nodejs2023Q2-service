import { Module } from '@nestjs/common';
import { ArtistController } from 'src/artists/artist.controller';
import { ArtistService } from 'src/artists/artist.service';
import { DatabaseModule } from 'src/db/database.module';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [DatabaseModule],
})
export class ArtistModule {}
