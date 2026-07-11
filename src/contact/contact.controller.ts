import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ContactStatus } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ContactService } from './contact.service';

class SetStatusDto {
  @IsEnum(ContactStatus)
  status: ContactStatus;
}

class ReplyDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  subject: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10000)
  body: string;
}

class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(160)
  company?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  message: string;
}

@Controller('contact')
export class ContactController {
  constructor(private readonly service: ContactService) {}

  /** Public: called by the site's contact form. */
  @Post()
  @HttpCode(201)
  create(@Body() dto: CreateMessageDto) {
    return this.service.create(dto);
  }

  /** Protected: list of messages for the dashboard. */
  @Get()
  @UseGuards(JwtAuthGuard)
  list() {
    return this.service.list();
  }

  /** Protected: number of unread messages (for the sidebar badge). */
  @Get('unread-count')
  @UseGuards(JwtAuthGuard)
  unreadCount() {
    return this.service.unreadCount();
  }

  @Patch(':id/read')
  @UseGuards(JwtAuthGuard)
  markRead(@Param('id') id: string) {
    return this.service.setRead(id, true);
  }

  @Patch(':id/unread')
  @UseGuards(JwtAuthGuard)
  markUnread(@Param('id') id: string) {
    return this.service.setRead(id, false);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  setStatus(@Param('id') id: string, @Body() dto: SetStatusDto) {
    return this.service.setStatus(id, dto.status);
  }

  @Post(':id/reply')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  reply(@Param('id') id: string, @Body() dto: ReplyDto) {
    return this.service.reply(id, dto.subject, dto.body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
