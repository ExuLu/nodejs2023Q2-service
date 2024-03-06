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
  getAllTracks() {
    this.trackService.getAllTracks();
  }

  @Get(':id')
  getTrackById(@Param() id: string) {
    this.trackService.getTrackById(id);
  }

  @Post()
  addTrack(@Body() createTrackDto: CreateTrackDto) {
    this.trackService.addNewTrack(createTrackDto);
  }

  @Put(':id')
  changeTrack(@Param() id: string, @Body() updateTrackDto: UpdateTrackDto) {
    this.trackService.changeTrack(id, updateTrackDto);
  }

  @Delete(':id')
  deleteTrack(@Param() id: string) {
    this.trackService.deleteTrack(id);
  }
}
