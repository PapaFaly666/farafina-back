import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';

@Injectable()
export class NewsletterService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mail: MailService,
  ) {}

  async subscribe(email: string): Promise<{ status: 'created' | 'exists' }> {
    const normalized = email.toLowerCase().trim();
    const existing = await this.prisma.newsletterSubscription.findUnique({
      where: { email: normalized },
    });
    if (existing) {
      return { status: 'exists' };
    }
    await this.prisma.newsletterSubscription.create({
      data: { email: normalized },
    });
    return { status: 'created' };
  }

  list() {
    return this.prisma.newsletterSubscription.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async remove(id: string) {
    await this.prisma.newsletterSubscription.delete({ where: { id } });
    return { ok: true };
  }

  /** Sends a newsletter campaign to every subscriber. */
  async sendCampaign(subject: string, message: string) {
    const subscribers = await this.prisma.newsletterSubscription.findMany({
      select: { email: true },
    });
    if (subscribers.length === 0) {
      throw new BadRequestException('Aucun abonné à qui envoyer la campagne.');
    }

    const { sent } = await this.mail.sendCampaign({
      to: subscribers.map((s) => s.email),
      subject,
      body: message,
    });

    return { sent, recipients: subscribers.length };
  }
}
