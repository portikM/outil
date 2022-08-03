import {
  Controller,
  Post,
  HttpCode,
  UsePipes,
  ValidationPipe,
  Body,
  UseGuards,
} from '@nestjs/common';
import { TrimService } from './trim.service';
import { MediaTypesEnum } from '../common/enums/media-types.enum';
import { TrimAudioDto } from './dto/trim-audio.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('trim')
export class TrimController {
  constructor(private trimService: TrimService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post(`/${MediaTypesEnum.AUDIO}`)
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async trimAudio(@Body() trimAudioDto: TrimAudioDto): Promise<string> {
    return await this.trimService.trimAudio(trimAudioDto);
  }
}
