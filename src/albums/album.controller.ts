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
import { CreateAlbumDto, UpdateAlbumDto } from './albumDtos';

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

  @Post()
  createAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.createNewAlbum(createAlbumDto);
  }

  @Put('id')
  updateAlbum(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumService.updateAlbumInfo(id, updateAlbumDto);
  }
}
