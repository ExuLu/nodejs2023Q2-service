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
import { TrackService } from 'src/services/track.service';
import { Track } from 'src/types/track';
import { CreateTrackDto, UpdateTrackDto } from 'src/validators/trackValidators';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getAllTracks(): Track[] {
    return this.trackService.getAllTracks();
  }

  @Get(':id')
  getTrackById(@Param('id') id: string): Track {
    return this.trackService.getTrackById(id);
  }

  @Post()
  addTrack(@Body() createTrackDto: CreateTrackDto): Track {
    return this.trackService.addNewTrack(createTrackDto);
  }

  @Put(':id')
  changeTrack(
    @Param('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Track {
    return this.trackService.changeTrack(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteTrack(@Param('id') id: string): void {
    return this.trackService.deleteTrack(id);
  }
}
