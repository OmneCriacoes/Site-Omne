import type { SiteSettings } from '@domain/entities';
import type { ContentRepository } from '@domain/repositories';

export class SiteService {
  #settings?: Promise<SiteSettings>;

  constructor(private readonly repository: ContentRepository) {}

  getSettings(): Promise<SiteSettings> {
    this.#settings ??= this.repository.getSettings();
    return this.#settings;
  }
}
