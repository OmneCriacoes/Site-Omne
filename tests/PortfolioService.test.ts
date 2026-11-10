import { describe, expect, it } from 'vitest';
import { PortfolioService } from '@application/PortfolioService';
import { InMemoryContentRepository, aProject } from './support/InMemoryContentRepository';

const projects = [
  aProject({ slug: 'natal', year: 2025, serviceSlugs: ['espacos-tematicos', 'esculturas'], segment: 'poder-publico' }),
  aProject({ slug: 'mural', year: 2024, serviceSlugs: ['murais'], featured: true }),
  aProject({ slug: 'mesa', year: 2023, serviceSlugs: ['mesas'], segment: 'eventos' }),
  aProject({ slug: 'escultura', year: 2025, serviceSlugs: ['esculturas'], segment: 'corporativo' }),
];

const service = new PortfolioService(new InMemoryContentRepository({ projects }));

describe('PortfolioService', () => {
  it('lista do mais recente para o mais antigo', async () => {
    const slugs = (await service.list()).map((p) => p.slug);
    expect(slugs).toEqual(['escultura', 'natal', 'mural', 'mesa']);
  });

  it('filtra por serviço e por segmento', async () => {
    expect((await service.list({ service: 'esculturas' })).map((p) => p.slug)).toEqual(['escultura', 'natal']);
    expect((await service.list({ segment: 'eventos' })).map((p) => p.slug)).toEqual(['mesa']);
  });

  it('coloca os destaques primeiro e completa com os mais recentes', async () => {
    expect((await service.featured(3)).map((p) => p.slug)).toEqual(['mural', 'escultura', 'natal']);
  });

  it('encontra relacionados pelo serviço, sem repetir o próprio projeto', async () => {
    const natal = (await service.findBySlug('natal'))!;
    expect((await service.related(natal, 3)).map((p) => p.slug)).toEqual(['escultura']);
  });

  it('lista apenas segmentos com projetos', async () => {
    expect(await service.segments()).toEqual(['corporativo', 'poder-publico', 'residencial', 'eventos']);
  });
});
