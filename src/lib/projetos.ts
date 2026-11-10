import { getCollection, type CollectionEntry } from 'astro:content';
import type { Categoria } from '../content.config';

type Projeto = CollectionEntry<'projetos'>;

const porOrdem = (a: Projeto, b: Projeto) => a.data.ordem - b.data.ordem || a.data.titulo.localeCompare(b.data.titulo, 'pt-BR');

export async function todosProjetos(): Promise<Projeto[]> {
  return (await getCollection('projetos')).sort(porOrdem);
}

export async function projetosDestaque(limite = 6): Promise<Projeto[]> {
  return (await todosProjetos()).filter((p) => p.data.destaque).slice(0, limite);
}

export async function projetosDaCategoria(categoria: Categoria): Promise<Projeto[]> {
  return (await todosProjetos()).filter((p) => p.data.categorias.includes(categoria));
}
