import { GetUploadUrlDto } from '../../../upload/dto/get-upload-url.dto';
import { TrimAudioDto } from '../../../trim/dto/trim-audio.dto';
import { ConcatAudioDto } from '../../../concat/dto/concat-audio.dto';
import { GetDownloadUrlDto } from '../../../download/dto/get-download-url.dto';
import { DeleteAudioDto } from '../../../delete/dto/delete-audio.dto';

export interface HttpRequest {
  body: TrimAudioDto | ConcatAudioDto | DeleteAudioDto;
  query: GetUploadUrlDto | GetDownloadUrlDto;
}
