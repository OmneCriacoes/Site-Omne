import { montarLinkWhatsApp } from './whatsapp.ts';
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

/** Conversa no WhatsApp da Omne, com uma mensagem opcional já escrita. */
export function linkWhatsApp(mensagem = ''): string {
  return montarLinkWhatsApp(site.whatsapp, mensagem).replace(/\?text=$/, '');
}
