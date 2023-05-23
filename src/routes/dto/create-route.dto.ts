import { IsNumber, IsString, IsNotEmpty, IsDecimal, IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateRouteDto {
  @IsNumber()
  originStationId: number;

  @IsNumber()
  destinationStationId: number;

  @IsDateString()
  @IsNotEmpty()
  departureTime: Date;

  @IsDateString()
  @IsNotEmpty()
  arrivalTime: Date;

  @IsNumber()
  distance: number;

  @IsNumber()
  price: number;
}