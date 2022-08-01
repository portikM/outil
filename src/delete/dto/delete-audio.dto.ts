import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteAudioDto {
  @IsNotEmpty()
  @IsString()
  key!: string;
}
