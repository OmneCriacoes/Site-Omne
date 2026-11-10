import type { Client, Project, Service, SiteSettings } from './entities';

/**
 * Contrato de leitura de conteúdo.
 *
 * Os serviços da aplicação dependem apenas desta interface. A implementação
 * concreta é escolhida em `src/core/container.ts`.
 */
export interface ContentRepository {
  getSettings(): Promise<SiteSettings>;
  listServices(): Promise<readonly Service[]>;
  listProjects(): Promise<readonly Project[]>;
  listClients(): Promise<readonly Client[]>;
}
