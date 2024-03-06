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
import { CreateTrackDto, UpdateTrackDto } from 'src/validators/trackValidators';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getAllTracks() {
    return this.trackService.getAllTracks();
  }

  @Get(':id')
  getTrackById(@Param('id') id: string) {
    return this.trackService.getTrackById(id);
  }

  @Post()
  addTrack(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.addNewTrack(createTrackDto);
  }

  @Put(':id')
  changeTrack(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    return this.trackService.changeTrack(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteTrack(@Param() id: string) {
    return this.trackService.deleteTrack(id);
  }
}
