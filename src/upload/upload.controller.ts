import {
  Controller,
  Get,
  UsePipes,
  ValidationPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { GetUploadUrlDto } from './dto/get-upload-url.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @UsePipes(new ValidationPipe())
  async getUploadUrl(
    @Query() getUploadUrlDto: GetUploadUrlDto,
  ): Promise<string> {
    return this.uploadService.getUploadUrl(getUploadUrlDto);
  }
}
