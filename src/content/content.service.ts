import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { DEFAULT_SITE_CONTENT } from './default-content';

const SINGLETON_ID = 1;

@Injectable()
export class ContentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  /** Returns the stored content, falling back to (and persisting) defaults. */
  async get(): Promise<Prisma.JsonValue> {
    const existing = await this.prisma.siteContent.findUnique({
      where: { id: SINGLETON_ID },
    });
    if (existing) {
      return existing.data;
    }

    const created = await this.prisma.siteContent.create({
      data: {
        id: SINGLETON_ID,
        data: DEFAULT_SITE_CONTENT as unknown as Prisma.InputJsonValue,
      },
    });
    return created.data;
  }

  /** Upserts the singleton content document and cleans up removed images. */
  async update(data: Record<string, unknown>): Promise<Prisma.JsonValue> {
    const previous = await this.prisma.siteContent.findUnique({
      where: { id: SINGLETON_ID },
    });

    const jsonData = data as Prisma.InputJsonValue;
    const saved = await this.prisma.siteContent.upsert({
      where: { id: SINGLETON_ID },
      update: { data: jsonData },
      create: { id: SINGLETON_ID, data: jsonData },
    });

    // Delete from Cloudinary any image that was in the old document but is no
    // longer referenced in the new one (covers removals and replacements).
    if (previous) {
      const before = this.collectImageUrls(previous.data);
      const after = this.collectImageUrls(data);
      const removed = [...before].filter((url) => !after.has(url));
      if (removed.length > 0) {
        void this.cloudinary.deleteManyByUrl(removed);
      }
    }

    return saved.data;
  }

  /** Recursively collects every Cloudinary image URL found in a content doc. */
  private collectImageUrls(value: unknown, acc = new Set<string>()): Set<string> {
    if (typeof value === 'string') {
      if (value.includes('res.cloudinary.com/')) acc.add(value);
    } else if (Array.isArray(value)) {
      for (const item of value) this.collectImageUrls(item, acc);
    } else if (value && typeof value === 'object') {
      for (const v of Object.values(value)) this.collectImageUrls(v, acc);
    }
    return acc;
  }
}
