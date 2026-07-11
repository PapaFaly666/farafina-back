import { Injectable, NotFoundException } from '@nestjs/common';
import { ContactStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';

interface CreateMessageInput {
  name: string;
  email: string;
  company?: string;
  message: string;
}

@Injectable()
export class ContactService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mail: MailService,
  ) {}

  async create(input: CreateMessageInput) {
    await this.prisma.contactMessage.create({
      data: {
        name: input.name.trim(),
        email: input.email.toLowerCase().trim(),
        company: input.company?.trim() || null,
        message: input.message.trim(),
      },
    });
    return { ok: true };
  }

  list() {
    return this.prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async setRead(id: string, read: boolean) {
    await this.prisma.contactMessage.update({
      where: { id },
      data: { read },
    });
    return { ok: true };
  }

  async setStatus(id: string, status: ContactStatus) {
    await this.prisma.contactMessage.update({
      where: { id },
      data: { status },
    });
    return { ok: true };
  }

  async unreadCount() {
    const count = await this.prisma.contactMessage.count({
      where: { read: false },
    });
    return { count };
  }

  /** Sends an e-mail reply to the sender and records it on the message. */
  async reply(id: string, subject: string, body: string) {
    const message = await this.prisma.contactMessage.findUnique({
      where: { id },
    });
    if (!message) {
      throw new NotFoundException('Message introuvable');
    }

    await this.mail.sendReply({
      to: message.email,
      subject,
      body,
      recipientName: message.name,
      originalMessage: message.message,
    });

    return this.prisma.contactMessage.update({
      where: { id },
      data: { repliedAt: new Date(), status: 'DONE', read: true },
    });
  }

  async remove(id: string) {
    await this.prisma.contactMessage.delete({ where: { id } });
    return { ok: true };
  }
}
