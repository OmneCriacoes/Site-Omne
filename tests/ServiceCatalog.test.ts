import { describe, expect, it } from 'vitest';
import { ServiceCatalog } from '@application/ServiceCatalog';
import { InMemoryContentRepository, aService } from './support/InMemoryContentRepository';

describe('ServiceCatalog', () => {
  const catalog = new ServiceCatalog(
    new InMemoryContentRepository({
      services: [aService({ slug: 'mesas', order: 3 }), aService({ slug: 'esculturas', order: 1 }), aService({ slug: 'murais', order: 2 })],
    }),
  );

  it('ordena pelo campo de ordem do painel', async () => {
    expect((await catalog.list()).map((s) => s.slug)).toEqual(['esculturas', 'murais', 'mesas']);
  });

  it('busca pelo slug', async () => {
    expect((await catalog.findBySlug('murais'))?.slug).toBe('murais');
    expect(await catalog.findBySlug('inexistente')).toBeUndefined();
  });
});
