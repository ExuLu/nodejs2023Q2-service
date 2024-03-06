import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { TrackService } from 'src/services/track.service';
import { CreateTrackDto, UpdateTrackDto } from 'src/validators/trackValidators';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}
  @Get()
  getAllTracks() {}

  @Get(':id')
  getTrackById(@Param() id: string) {}

  @Post()
  addTrack(@Body() createTrackDto: CreateTrackDto) {}

  @Put(':id')
  changeTrack(@Param() id: string, @Body() updateTrackDto: UpdateTrackDto) {}

  @Delete(':id')
  deleteTrack(@Param() id: string) {}
}
