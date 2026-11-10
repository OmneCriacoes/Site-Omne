/**
 * Cada bloco de mídia nasce com data-skeleton="carregando" e mostra o brilho.
 * Quando a imagem termina de carregar (ou falha), o atributo muda e a imagem aparece.
 */
export interface DependenciasSkeleton {
  aoTerminar?: (bloco: HTMLElement) => void;
}

export function revelarMidias(raiz: ParentNode, deps: DependenciasSkeleton = {}): void {
  raiz.querySelectorAll<HTMLElement>('[data-skeleton="carregando"]').forEach((bloco) => {
    const img = bloco.querySelector('img');
    const terminar = () => {
      bloco.dataset.skeleton = 'pronto';
      deps.aoTerminar?.(bloco);
    };
    if (!img || (img.complete && img.naturalWidth > 0)) return terminar();
    img.addEventListener('load', terminar, { once: true });
    img.addEventListener('error', terminar, { once: true });
  });
}
