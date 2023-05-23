import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Station } from './entities/station.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStationDto } from './dto/create-station.dto';

@Injectable()
export class StationService {

  constructor(
    @InjectRepository(Station)
    private readonly stationRepository: Repository<Station>,
  ) {}

  async findAll(): Promise<Station[]> {
    return this.stationRepository.find();
  }

  async create(station: CreateStationDto) {
    const createdStation = this.stationRepository.create(station);
    return this.stationRepository.save(createdStation);
  }
}