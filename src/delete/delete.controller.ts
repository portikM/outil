import {
  Controller,
  Delete,
  UsePipes,
  ValidationPipe,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ClearStorageService } from '../clear-storage/clear-storage.service';
import { MediaTypesEnum } from '../common/enums/media-types.enum';
import { DeleteAudioDto } from './dto/delete-audio.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('delete')
export class DeleteController {
  constructor(private clearStorageService: ClearStorageService) {}

  @UseGuards(AuthGuard('jwt'))
  @Delete(`/${MediaTypesEnum.AUDIO}`)
  @UsePipes(new ValidationPipe())
  async deleteAudio(@Body() deleteAudioDto: DeleteAudioDto): Promise<void> {
    return await this.clearStorageService.deleteObject(
      `${MediaTypesEnum.AUDIO}/${deleteAudioDto.key}.mp3`,
    );
  }
}
