import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { Album } from './albumType';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  getAllAlbums(): Album[] {
    return this.albumService.getAllAlbums();
  }

  @Get('id')
  getAlbumById(@Param('id') id: string): Album {
    return this.albumService.getAlbumById(id);
  }
}
