import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { NewsletterService } from './newsletter.service';

class SubscribeDto {
  @IsEmail()
  email: string;
}

class CampaignDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  subject: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20000)
  message: string;
}

@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly service: NewsletterService) {}

  /** Public: called by the site's newsletter form. */
  @Post()
  @HttpCode(201)
  subscribe(@Body() dto: SubscribeDto) {
    return this.service.subscribe(dto.email);
  }

  /** Protected: list of subscribers for the dashboard. */
  @Get()
  @UseGuards(JwtAuthGuard)
  list() {
    return this.service.list();
  }

  /** Protected: send a newsletter campaign to all subscribers. */
  @Post('campaign')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  sendCampaign(@Body() dto: CampaignDto) {
    return this.service.sendCampaign(dto.subject, dto.message);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
