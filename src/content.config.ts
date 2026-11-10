import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Esquemas do conteúdo editado pelo painel (public/admin/config.yml).
 * Ao mudar um campo aqui, atualize também o painel.
 */

const segment = z.enum(['poder-publico', 'residencial', 'corporativo', 'eventos']);

const image = z.object({
  src: z.string(),
  alt: z.string(),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    highlights: z.array(z.string()).default([]),
    cover: image,
    order: z.number().int().default(99),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    services: z.array(z.string()).min(1),
    segment,
    client: z.string().default(''),
    location: z.string().default(''),
    year: z.number().int().optional(),
    cover: image,
    gallery: z.array(image).default([]),
    featured: z.boolean().default(false),
    order: z.number().int().default(99),
  }),
});

const clients = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/clients' }),
  schema: z.object({
    name: z.string(),
    segment,
    logo: image.optional(),
  }),
});

const settings = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/settings' }),
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    description: z.string(),
    theme: z.enum(['galeria', 'cinema', 'atelie']),
    showThemePreview: z.boolean().default(false),
    heroTitle: z.string(),
    heroSubtitle: z.string(),
    heroImage: image,
    aboutTitle: z.string(),
    aboutText: z.string(),
    stats: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
    contact: z.object({
      whatsapp: z.string(),
      phoneDisplay: z.string(),
      email: z.string().email(),
      city: z.string(),
      instagram: z.string().optional(),
    }),
  }),
});

export const collections = { services, projects, clients, settings };
