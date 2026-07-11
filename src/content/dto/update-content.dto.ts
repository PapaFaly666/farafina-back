import { IsObject } from 'class-validator';

export class UpdateContentDto {
  /**
   * The full site content document. Kept as a free-form object so the client
   * can edit any section without a backend change; the frontend owns the shape.
   */
  @IsObject()
  data: Record<string, unknown>;
}
