import { IsNotEmpty, IsString, IsNumber, IsPositive } from 'class-validator';
import { EventDTO } from '@cfp-plataform/shared-types';

export class CreateEventDto implements EventDTO {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  address!: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  capacity!: number;

  @IsString()
  @IsNotEmpty()
  date!: string;
}
