import { IsString, IsNotEmpty, Length } from 'class-validator'; 

export class CreateStationDto {
  @IsString()
  @Length(2, 255, { message: 'Name must be at least 2 characters long'})
  @IsNotEmpty()
  name: string;

  @IsString()
  @Length(2, 255, { message: 'City must be at least 2 characters long'})
  @IsNotEmpty()
  city: string;
}