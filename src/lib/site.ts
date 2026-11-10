import geral from '../content/site/geral.json';
import { CATEGORIAS, type Categoria } from '../content.config';

export const site = geral;

export const navegacao = [
  { href: '/projetos/', rotulo: 'Projetos' },
  { href: '/servicos/', rotulo: 'Serviços' },
  { href: '/sobre/', rotulo: 'Sobre' },
] as const;

export const rotuloCategoria = (c: Categoria) => CATEGORIAS[c];
export const listaCategorias = Object.entries(CATEGORIAS) as [Categoria, string][];
