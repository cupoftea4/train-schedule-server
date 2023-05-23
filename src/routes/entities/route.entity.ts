import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Station } from './../../stations/entities/station.entity';

@Entity({ name: 'train_routes' })
export class Route {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'origin_station_id' })
  originStationId: number;

  @Column({ name: 'destination_station_id' })
  destinationStationId: number;

  @Column({ name: 'departure_time' })
  departureTime: Date;

  @Column({ name: 'arrival_time' })
  arrivalTime: Date;

  @Column({ type: 'float' })
  distance: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => Station, station => station.originRoutes)
  @JoinColumn({ name: 'origin_station_id' })
  originStation: Station;

  @ManyToOne(() => Station, station => station.destinationRoutes)
  @JoinColumn({ name: 'destination_station_id' })
  destinationStation: Station;
}