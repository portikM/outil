import {
  Controller,
  Post,
  HttpCode,
  UsePipes,
  ValidationPipe,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ConcatService } from './concat.service';
import { MediaTypesEnum } from '../common/enums/media-types.enum';
import { ConcatAudioDto } from './dto/concat-audio.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('concat')
export class ConcatController {
  constructor(private concatService: ConcatService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post(`/${MediaTypesEnum.AUDIO}`)
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async concatAudioFiles(
    @Body() concatAudioDto: ConcatAudioDto,
  ): Promise<string> {
    return await this.concatService.concatAudioFiles(concatAudioDto);
  }
}
