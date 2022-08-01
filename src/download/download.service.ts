import { Injectable, NotFoundException } from '@nestjs/common';
import { StorageService } from '../infrastructure/storage/storage.service';
import { GetDownloadUrlDto } from './dto/get-download-url-dto.dto';

const { OUTPUT_BUCKET = '' } = process.env;

@Injectable()
export class DownloadService {
  constructor(private storageService: StorageService) {}

  async getDownloadUrl(getDownloadUrlDto: GetDownloadUrlDto): Promise<string> {
    const objectExists = await this.storageService.objectExists(
      getDownloadUrlDto.mediaType,
      getDownloadUrlDto.key,
    );

    if (!objectExists) {
      throw new NotFoundException('Recording not found');
    }

    return `https://${OUTPUT_BUCKET}.s3.ca-central-1.amazonaws.com/audio/${getDownloadUrlDto.key}.mp3`;
  }
}
