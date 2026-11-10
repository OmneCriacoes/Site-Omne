/** Filtro de projetos por categoria, sem recarregar a página. */
export interface DependenciasFiltro {
  botoes: HTMLButtonElement[];
  itens: HTMLElement[];
  lerInicial: () => string | null;
  gravar: (categoria: string) => void;
}

export function itemPertence(categoriasDoItem: string, filtro: string): boolean {
  return filtro === 'todos' || categoriasDoItem.split(' ').includes(filtro);
}

export function criarFiltro({ botoes, itens, lerInicial, gravar }: DependenciasFiltro): void {
  const aplicar = (filtro: string) => {
    botoes.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filtro === filtro)));
    itens.forEach((item) => (item.hidden = !itemPertence(item.dataset.categorias ?? '', filtro)));
  };

  botoes.forEach((botao) =>
    botao.addEventListener('click', () => {
      const filtro = botao.dataset.filtro ?? 'todos';
      aplicar(filtro);
      gravar(filtro);
    }),
  );

  const inicial = lerInicial();
  aplicar(botoes.some((b) => b.dataset.filtro === inicial) ? inicial! : 'todos');
}
