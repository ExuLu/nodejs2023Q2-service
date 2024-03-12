import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoriteService } from './favorites.service';
import { DatabaseModule } from 'src/db/database.module';

@Module({
  controllers: [FavoritesController],
  providers: [FavoriteService],
  imports: [DatabaseModule],
})
export class FavoritesModule {}
