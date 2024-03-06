import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { TrackService } from 'src/services/track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}
  @Get()
  getAllTracks() {}

  @Get(':id')
  getTrackById(@Param() id: string) {}

  @Post()
  addTrack(@Body()){}

  @Put(':id')
  changeTrack(@Param() id: string, @Body()){}

  @Delete(':id')
  deleteTrack(@Param()id: string) {}
}
