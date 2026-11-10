/**
 * Entidades de domínio do site.
 *
 * Esta camada não depende de Astro, do CMS nem do navegador. Tudo que o site
 * exibe passa por estes tipos, o que permite trocar a origem do conteúdo
 * (arquivos, API, banco) sem tocar em páginas e componentes.
 */

export type ThemeId = 'galeria' | 'cinema' | 'atelie';

export type ClientSegment = 'poder-publico' | 'residencial' | 'corporativo' | 'eventos';

export interface Image {
  readonly src: string;
  readonly alt: string;
}

export interface Service {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  /** HTML já convertido a partir do Markdown do painel. */
  readonly descriptionHtml: string;
  readonly highlights: readonly string[];
  readonly cover: Image;
  readonly order: number;
}

export interface Project {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  /** HTML já convertido a partir do Markdown do painel. */
  readonly bodyHtml: string;
  readonly serviceSlugs: readonly string[];
  readonly segment: ClientSegment;
  readonly clientName: string;
  readonly location: string;
  readonly year?: number;
  readonly cover: Image;
  readonly gallery: readonly Image[];
  readonly featured: boolean;
  /** Posição no portfólio; menor aparece primeiro. */
  readonly order: number;
}

export interface Client {
  readonly slug: string;
  readonly name: string;
  readonly segment: ClientSegment;
  readonly logo?: Image;
}

export interface ContactInfo {
  readonly whatsapp: string;
  readonly phoneDisplay: string;
  readonly email: string;
  readonly city: string;
  readonly instagram?: string;
}

export interface SiteSettings {
  readonly name: string;
  readonly tagline: string;
  readonly description: string;
  readonly theme: ThemeId;
  readonly showThemePreview: boolean;
  readonly heroTitle: string;
  readonly heroSubtitle: string;
  readonly heroImage: Image;
  readonly aboutTitle: string;
  readonly aboutText: string;
  readonly stats: readonly { readonly value: string; readonly label: string }[];
  readonly contact: ContactInfo;
}

export const SEGMENT_LABELS: Readonly<Record<ClientSegment, string>> = {
  'poder-publico': 'Prefeituras e poder público',
  residencial: 'Condomínios residenciais',
  corporativo: 'Empresas',
  eventos: 'Eventos',
};

export const THEME_LABELS: Readonly<Record<ThemeId, string>> = {
  galeria: 'Galeria',
  cinema: 'Cinema',
  atelie: 'Ateliê',
};
