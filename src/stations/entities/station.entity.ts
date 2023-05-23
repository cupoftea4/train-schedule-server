import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Route } from './../../routes/entities/route.entity';

@Entity('train_stations')
export class Station {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  city: string;

  @OneToMany(() => Route, route => route.originStation)
  originRoutes: Route[];

  @OneToMany(() => Route, route => route.destinationStation)
  destinationRoutes: Route[];
}