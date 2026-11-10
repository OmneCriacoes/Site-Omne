import type { Service } from '@domain/entities';
import type { ContentRepository } from '@domain/repositories';

export class ServiceCatalog {
  constructor(private readonly repository: ContentRepository) {}

  async list(): Promise<readonly Service[]> {
    const services = await this.repository.listServices();
    return [...services].sort((a, b) => a.order - b.order || a.title.localeCompare(b.title, 'pt-BR'));
  }

  async findBySlug(slug: string): Promise<Service | undefined> {
    const services = await this.list();
    return services.find((service) => service.slug === slug);
  }
}
