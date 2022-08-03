import {
  Controller,
  Get,
  UsePipes,
  ValidationPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DownloadService } from './download.service';
import { GetDownloadUrlDto } from './dto/get-download-url.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('download')
export class DownloadController {
  constructor(private downloadService: DownloadService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @UsePipes(new ValidationPipe())
  async getDownloadUrl(
    @Query() getDownloadUrlDto: GetDownloadUrlDto,
  ): Promise<string> {
    return await this.downloadService.getDownloadUrl(getDownloadUrlDto);
  }
}
