import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { Artist } from './artistInterface';
import { CreateArtistDto, UpdateArtistDto } from './artistDtos';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  getAllArtists(): Artist[] {
    return this.artistService.getAllArtists();
  }

  @Get(':id')
  getArtistById(@Param('id') id: string): Artist {
    return this.artistService.getArtistById(id);
  }

  @Post()
  createArtist(@Body() createArtistDto: CreateArtistDto): Artist {
    return this.artistService.createNewArtist(createArtistDto);
  }

  @Put(':id')
  updateArtist(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Artist {
    return this.artistService.updateArtistInfo(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteArtist(@Param('id') id: string): void {
    return this.artistService.deleteArtist(id);
  }
}
