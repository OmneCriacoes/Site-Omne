import type { Client, Project, Service, SiteSettings } from '@domain/entities';
import type { ContentRepository } from '@domain/repositories';

/** Repositório em memória: substitui o Astro nos testes via injeção. */
export class InMemoryContentRepository implements ContentRepository {
  constructor(
    private readonly data: {
      settings?: SiteSettings;
      services?: Service[];
      projects?: Project[];
      clients?: Client[];
    },
  ) {}

  async getSettings(): Promise<SiteSettings> {
    if (!this.data.settings) throw new Error('settings não definido');
    return this.data.settings;
  }

  async listServices() {
    return this.data.services ?? [];
  }

  async listProjects() {
    return this.data.projects ?? [];
  }

  async listClients() {
    return this.data.clients ?? [];
  }
}

const image = { src: '/x.svg', alt: 'x' };

export function aProject(overrides: Partial<Project> & Pick<Project, 'slug'>): Project {
  return {
    title: overrides.slug,
    summary: '',
    bodyHtml: '',
    serviceSlugs: ['murais'],
    segment: 'residencial',
    clientName: 'Cliente',
    location: 'Bauru',
    year: 2024,
    cover: image,
    gallery: [],
    featured: false,
    ...overrides,
  };
}

export function aService(overrides: Partial<Service> & Pick<Service, 'slug'>): Service {
  return {
    title: overrides.slug,
    summary: '',
    descriptionHtml: '',
    highlights: [],
    cover: image,
    order: 99,
    ...overrides,
  };
}
