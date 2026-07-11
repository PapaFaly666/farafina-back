import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ContentService } from './content.service';
import { UpdateContentDto } from './dto/update-content.dto';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  /** Public: consumed by the marketing site to render its content. */
  @Get()
  async get() {
    return { data: await this.contentService.get() };
  }

  /** Protected: the dashboard saves the whole content document here. */
  @Put()
  @UseGuards(JwtAuthGuard)
  async update(@Body() dto: UpdateContentDto) {
    return { data: await this.contentService.update(dto.data) };
  }
}
