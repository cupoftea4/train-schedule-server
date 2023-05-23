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

  findByOriginAndDest(source: string, destination: string) {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const startOfDayAfter7Days = new Date();
    startOfDayAfter7Days.setHours(0, 0, 0, 0);
    startOfDayAfter7Days.setDate(startOfDayAfter7Days.getDate() + 7);

    return omitForeignIds(
        this.routesRepository
          .createQueryBuilder('route')
          .leftJoinAndSelect("route.originStation", "origin")
          .leftJoinAndSelect("route.destinationStation", "destination")
          .where('origin.city = :source', { source })
          .andWhere('destination.city = :destination', { destination })
          .andWhere('route.departureTime >= :startOfDay', { startOfDay: startOfToday })
          .andWhere('route.departureTime < :nextDay', { nextDay: startOfDayAfter7Days })
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
