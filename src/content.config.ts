import { defineCollection, z } from 'astro:content';
import { file, glob } from 'astro/loaders';

/** Categorias de serviço. A chave é usada nas URLs e nos filtros; o rótulo aparece no site. */
export const CATEGORIAS = {
  esculturas: 'Esculturas',
  murais: 'Murais',
  mesas: 'Mesas',
  'espacos-tematicos': 'Espaços temáticos',
  projetos: 'Projetos',
} as const;

export type Categoria = keyof typeof CATEGORIAS;
const categoria = z.enum(Object.keys(CATEGORIAS) as [Categoria, ...Categoria[]]);

const projetos = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/projetos', generateId: ({ entry }) => entry.split('/')[0] }),
  schema: ({ image }) =>
    z.object({
      titulo: z.string(),
      resumo: z.string(),
      cliente: z.string().default(''),
      local: z.string().default(''),
      ano: z.number().int().optional(),
      categorias: z.array(categoria).min(1),
      capa: image(),
      galeria: z
        .array(z.object({ imagem: image(), legenda: z.string().default('') }))
        .default([]),
      destaque: z.boolean().default(false),
      ordem: z.number().default(100),
    }),
});

const servicos = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/servicos' }),
  schema: ({ image }) =>
    z.object({
      titulo: z.string(),
      categoria,
      chamada: z.string(),
      /** Linha curta do menu (até 30 caracteres). */
      menu: z.string().max(30).default(''),
      itens: z.array(z.string()).default([]),
      /** Foto de um trabalho deste serviço; sem foto, o serviço aparece só em texto. */
      foto: image().optional(),
      fotoAlt: z.string().default(''),
      ordem: z.number().default(100),
    }),
});

const clientes = defineCollection({
  loader: file('src/content/site/clientes.json'),
  schema: ({ image }) => z.object({ nome: z.string(), logo: image() }),
});

const etapas = defineCollection({
  loader: file('src/content/site/processo.json'),
  schema: z.object({ titulo: z.string(), texto: z.string() }),
});

export const collections = { projetos, servicos, clientes, etapas };
