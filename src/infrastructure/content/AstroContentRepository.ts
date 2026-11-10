import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import type { Client, Project, Service, SiteSettings } from '@domain/entities';
import type { ContentRepository } from '@domain/repositories';

/**
 * Lê o conteúdo das coleções do Astro (arquivos em src/content, editados pelo
 * painel) e converte para as entidades de domínio.
 */
export class AstroContentRepository implements ContentRepository {
  constructor(private readonly settingsId = 'site') {}

  async getSettings(): Promise<SiteSettings> {
    const entry = await getEntry('settings', this.settingsId);
    if (!entry) {
      throw new Error(`Configurações "${this.settingsId}" não encontradas em src/content/settings.`);
    }
    return entry.data;
  }

  async listServices(): Promise<readonly Service[]> {
    const entries = await getCollection('services');
    return entries.map(toService);
  }

  async listProjects(): Promise<readonly Project[]> {
    const entries = await getCollection('projects');
    return entries.map(toProject);
  }

  async listClients(): Promise<readonly Client[]> {
    const entries = await getCollection('clients');
    return entries.map(toClient);
  }
}

function toService({ id, data, rendered }: CollectionEntry<'services'>): Service {
  return {
    slug: id,
    title: data.title,
    summary: data.summary,
    descriptionHtml: rendered?.html ?? '',
    highlights: data.highlights,
    cover: data.cover,
    order: data.order,
  };
}

function toProject({ id, data, rendered }: CollectionEntry<'projects'>): Project {
  return {
    slug: id,
    title: data.title,
    summary: data.summary,
    bodyHtml: rendered?.html ?? '',
    serviceSlugs: data.services,
    segment: data.segment,
    clientName: data.client,
    location: data.location,
    year: data.year,
    cover: data.cover,
    gallery: data.gallery,
    featured: data.featured,
  };
}

function toClient({ id, data }: CollectionEntry<'clients'>): Client {
  return { slug: id, name: data.name, segment: data.segment, logo: data.logo };
}
