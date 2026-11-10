import type { ClientSegment, Project } from '@domain/entities';
import type { ContentRepository } from '@domain/repositories';

export interface ProjectFilter {
  readonly service?: string;
  readonly segment?: ClientSegment;
}

export class PortfolioService {
  constructor(private readonly repository: ContentRepository) {}

  /** Projetos na ordem definida no painel; empates vão do mais recente para o mais antigo. */
  async list(filter: ProjectFilter = {}): Promise<readonly Project[]> {
    const projects = await this.repository.listProjects();
    return [...projects]
      .filter((project) => !filter.service || project.serviceSlugs.includes(filter.service))
      .filter((project) => !filter.segment || project.segment === filter.segment)
      .sort((a, b) => a.order - b.order || (b.year ?? 0) - (a.year ?? 0) || a.title.localeCompare(b.title, 'pt-BR'));
  }

  /** Destaques escolhidos no painel; completa com os mais recentes se faltar. */
  async featured(limit: number): Promise<readonly Project[]> {
    const all = await this.list();
    const chosen = all.filter((project) => project.featured);
    const rest = all.filter((project) => !project.featured);
    return [...chosen, ...rest].slice(0, limit);
  }

  async findBySlug(slug: string): Promise<Project | undefined> {
    const all = await this.list();
    return all.find((project) => project.slug === slug);
  }

  /** Outros projetos que compartilham ao menos um serviço. */
  async related(project: Project, limit: number): Promise<readonly Project[]> {
    const all = await this.list();
    return all
      .filter((candidate) => candidate.slug !== project.slug)
      .filter((candidate) => candidate.serviceSlugs.some((slug) => project.serviceSlugs.includes(slug)))
      .slice(0, limit);
  }

  /** Segmentos que possuem ao menos um projeto, na ordem em que aparecem. */
  async segments(): Promise<readonly ClientSegment[]> {
    const all = await this.list();
    return [...new Set(all.map((project) => project.segment))];
  }
}
