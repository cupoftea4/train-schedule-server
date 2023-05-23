import { Body, Controller, Get, Post } from '@nestjs/common';
import { StationService } from './station.service';
import { CreateStationDto } from './dto/create-station.dto';

@Controller('stations')
export class StationController {
  constructor(private readonly stationService: StationService) {}

  @Get()
  getAll() {
    return this.stationService.findAll();
  }

  @Post()
  create(@Body() station: CreateStationDto) {
    return this.stationService.create(station);
  }
}
