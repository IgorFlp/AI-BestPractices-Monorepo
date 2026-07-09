import { IsNotEmpty, IsEmail, IsString, IsBoolean } from 'class-validator';
import { SpeakerDTO } from '@cfp-plataform/shared-types';

export class CreateSpeakerDto implements SpeakerDTO {
  @IsString()
  @IsNotEmpty()
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
