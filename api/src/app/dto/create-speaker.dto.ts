import { IsNotEmpty, IsEmail, IsString, IsBoolean, IsOptional } from 'class-validator';
import { SpeakerDTO } from '@cfp-plataform/shared-types';

export class CreateSpeakerDto implements SpeakerDTO {
  @IsString()
  @IsOptional()
  id!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  talkTitle!: string;

  @IsBoolean()
  isGDE!: boolean;
}
