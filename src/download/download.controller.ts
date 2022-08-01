import {
  Controller,
  Get,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { DownloadService } from './download.service';
import { GetDownloadUrlDto } from './dto/get-download-url-dto.dto';

@Controller('download')
export class DownloadController {
  constructor(private downloadService: DownloadService) {}

  @Get()
  @UsePipes(new ValidationPipe())
  async getDownloadUrl(
    @Query() getDownloadUrlDto: GetDownloadUrlDto,
  ): Promise<string> {
    return await this.downloadService.getDownloadUrl(getDownloadUrlDto);
  }
}
