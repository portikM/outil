import {
  Controller,
  Delete,
  UsePipes,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import { ClearStorageService } from '../clear-storage/clear-storage.service';
import { MediaTypesEnum } from '../common/enums/media-types.enum';
import { DeleteAudioDto } from './dto/delete-audio.dto';

@Controller('delete')
export class DeleteController {
  constructor(private clearStorageService: ClearStorageService) {}

  @Delete(`/${MediaTypesEnum.AUDIO}`)
  @UsePipes(new ValidationPipe())
  async deleteAudio(@Body() deleteAudioDto: DeleteAudioDto): Promise<void> {
    return await this.clearStorageService.deleteObject(
      `${MediaTypesEnum.AUDIO}/${deleteAudioDto.key}.mp3`,
    );
  }
}
