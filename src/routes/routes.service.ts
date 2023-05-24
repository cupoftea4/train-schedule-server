import { Injectable } from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Route } from './entities/route.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';


@Injectable()
export class RoutesService {
  constructor(
    @InjectRepository(Route)
    private readonly routesRepository: Repository<Route>,
  ) {}

  create(createRouteDto: CreateRouteDto) {
    return this.routesRepository.save(createRouteDto);
  }

  findAll() {
    return omitForeignIds(
        this.routesRepository
          .createQueryBuilder('route')
          .leftJoinAndSelect("route.originStation", "origin")
          .leftJoinAndSelect("route.destinationStation", "destination")
      ).getMany()
  }

  findByOriginAndDest(source: string, destination: string, date: string) {
    let start: Date, end: Date;
    if (!date) {
      start = new Date();
      start.setHours(0, 0, 0, 0);

      const end = new Date();
      end.setHours(0, 0, 0, 0);
      end.setDate(end.getDate() + 7);
    } else {
      start = new Date(date);
      start.setHours(0, 0, 0, 0);

      end = new Date(date);
      end.setHours(0, 0, 0, 0);
      end.setDate(end.getDate() + 1);
    }

    console.log(start, end);
    
    return omitForeignIds(
        this.routesRepository
          .createQueryBuilder('route')
          .leftJoinAndSelect("route.originStation", "origin")
          .leftJoinAndSelect("route.destinationStation", "destination")
          .where('origin.city = :source', { source })
          .andWhere('destination.city = :destination', { destination })
          .andWhere('route.departureTime >= :start', { start })
          .andWhere('route.departureTime < :end', { end })
      ).getMany()
  }

  findOne(id: number) {
    return `This action returns a #${id} route`;
  }


  remove(id: number) {
    return `This action removes a #${id} route`;
  }
}


function omitForeignIds(builder: SelectQueryBuilder<Route>) {
  return builder.select([
    'route.id',
    'route.departureTime',
    'route.arrivalTime',
    'route.distance',
    'route.price',
    'origin',
    'destination',
  ])
}
