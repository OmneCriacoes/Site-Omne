import { ContactService } from '@application/ContactService';
import { PortfolioService } from '@application/PortfolioService';
import { ServiceCatalog } from '@application/ServiceCatalog';
import { SiteService } from '@application/SiteService';
import type { ContentRepository } from '@domain/repositories';
import { AstroContentRepository } from '@infrastructure/content/AstroContentRepository';

/**
 * Raiz de composição: o único lugar que conhece as implementações concretas.
 * Páginas e componentes recebem os serviços prontos daqui.
 */
export interface AppContainer {
  readonly site: SiteService;
  readonly catalog: ServiceCatalog;
  readonly portfolio: PortfolioService;
  readonly repository: ContentRepository;
  contact(): Promise<ContactService>;
}

export function createContainer(repository: ContentRepository): AppContainer {
  const site = new SiteService(repository);
  let contact: Promise<ContactService> | undefined;

  return {
    repository,
    site,
    catalog: new ServiceCatalog(repository),
    portfolio: new PortfolioService(repository),
    contact() {
      contact ??= site
        .getSettings()
        .then(({ contact: info }) => new ContactService(info.whatsapp, info.email));
      return contact;
    },
  };
}

export const container = createContainer(new AstroContentRepository());
