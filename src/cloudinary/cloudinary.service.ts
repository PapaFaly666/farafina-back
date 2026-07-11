import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  private readonly logger = new Logger(CloudinaryService.name);
  private readonly cloudName: string;

  constructor(config: ConfigService) {
    this.cloudName = config.get<string>('CLOUDINARY_CLOUD_NAME') ?? '';
    cloudinary.config({
      cloud_name: this.cloudName,
      api_key: config.get<string>('CLOUDINARY_API_KEY'),
      api_secret: config.get<string>('CLOUDINARY_API_SECRET'),
      secure: true,
    });
  }

  async uploadImage(
    file: Express.Multer.File,
  ): Promise<{ url: string; publicId: string }> {
    try {
      const dataUri = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
      const result = await cloudinary.uploader.upload(dataUri, {
        folder: 'farafina',
        resource_type: 'image',
      });
      return { url: result.secure_url, publicId: result.public_id };
    } catch {
      throw new InternalServerErrorException(
        "Échec de l'envoi de l'image vers Cloudinary",
      );
    }
  }

  /**
   * Extracts the Cloudinary public id from one of *our* image URLs.
   * Returns null for empty values or URLs that don't belong to our cloud
   * (e.g. an externally pasted URL), so we never delete foreign assets.
   */
  extractPublicId(url: string): string | null {
    if (!url || !this.cloudName) return null;
    if (!url.includes(`res.cloudinary.com/${this.cloudName}/`)) return null;

    const marker = '/upload/';
    const idx = url.indexOf(marker);
    if (idx === -1) return null;

    let path = url.slice(idx + marker.length); // e.g. v123/farafina/abc.png
    path = path.replace(/^v\d+\//, ''); // strip version
    path = path.replace(/\.[a-zA-Z0-9]+$/, ''); // strip extension
    return path || null;
  }

  /** Deletes a single image by its URL. Best-effort: never throws. */
  async deleteByUrl(url: string): Promise<void> {
    const publicId = this.extractPublicId(url);
    if (!publicId) return;
    try {
      await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
      this.logger.log(`Deleted Cloudinary image ${publicId}`);
    } catch (err) {
      this.logger.warn(
        `Failed to delete Cloudinary image ${publicId}: ${String(err)}`,
      );
    }
  }

  async deleteManyByUrl(urls: string[]): Promise<void> {
    await Promise.all(urls.map((u) => this.deleteByUrl(u)));
  }
}
